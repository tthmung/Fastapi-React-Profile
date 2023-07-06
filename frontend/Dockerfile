# Fetching the latest node image on apline linux
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

# Fetching the latest nginx image
FROM nginx

# Installing Certbot and obtaining SSL certificate
RUN apk add --no-cache certbot openssl && \
    mkdir -p /etc/letsencrypt/live && \
    openssl dhparam -out /etc/letsencrypt/dhparam.pem 2048 && \
    certbot certonly --standalone --agree-tos --email thawngtha122@example.com -d tthmung.com -n

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Renew SSL certificates using Certbot
RUN echo "0 12 * * * certbot renew --quiet" | crontab -
