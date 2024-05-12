# Stage 1: Build Angular application
FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve built files using NGINX
FROM nginx:latest

# Copy built Angular files from the previous stage
COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html

# Expose port 80 for NGINX
EXPOSE 80
