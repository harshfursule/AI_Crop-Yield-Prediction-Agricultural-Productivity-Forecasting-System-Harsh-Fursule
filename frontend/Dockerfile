# Multi-Stage Build for YieldSense AI React Frontend
# Stage 1: Build static production assets
FROM node:20-alpine AS build

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve production assets via lightweight Nginx Alpine
FROM nginx:alpine AS runtime

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from builder stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
