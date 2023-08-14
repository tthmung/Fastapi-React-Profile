# Stage 1: Build the Node.js application
FROM node:alpine AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Stage 2: Set up Nginx and obtain SSL certificates
FROM nginx

# Copying built assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Install necessary packages using apt-get (for Debian/Ubuntu-based images)
RUN apt-get update && \
    apt-get install -y certbot openssl && \
    rm -rf /var/lib/apt/lists/*

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the renewal script into the container
COPY renew_cert.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/renew_cert.sh

# Add the cron job
RUN echo "0 12 * * * /usr/local/bin/renew_cert.sh"

# Start Nginx and cron (use a supervisord or similar for managing multiple processes if needed)
CMD ["sh", "-c", "service cron start && nginx -g 'daemon off;'"]
