FROM node:8.10

# Create app directory
RUN mkdir -p /app

# Change the working directory
WORKDIR /app

# Copy package.json to the root of the app
COPY ./ /app