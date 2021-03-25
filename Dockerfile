FROM node:10 AS build

COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build

# EXPOSE 3000
CMD ["npm","start"]
FROM nginx:alpine

#nginx setting
WORKDIR /usr/share/nginx
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Copy static assets from builder stage
COPY --from=build /build /usr/share/nginx/html

# Exposing nginx port
EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]