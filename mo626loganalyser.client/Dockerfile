FROM node:20 AS base
WORKDIR /app

# Install dependencies early to take advantage of Docker caching
COPY mo626loganalyser.client/package*.json ./
RUN npm install

# Copy the rest of the app
COPY mo626loganalyser.client/ ./

# Default command overridden by docker-compose.override.yml during development
CMD ["npm", "run", "build"]
