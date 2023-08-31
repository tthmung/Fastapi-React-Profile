# Base image
FROM python:3.11

# Set the working directory
WORKDIR /backend

# Copy the requirements file
COPY ./requirements.txt /backend/requirements.txt

# Install production dependencies
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

# Copy the application code
COPY . .

ENV IS_PRODUCTION = True

FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"] && ["uvicorn", "main:app", "--workers", "4"]
