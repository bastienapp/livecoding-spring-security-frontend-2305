# Dockerfile frontend
# build environment
FROM node:lts-slim as build
WORKDIR /build
COPY package.json package-lock.json ./
ENV PATH ./node_modules/.bin:$PATH
RUN npm ci
COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration production --output-path=dist

# production environment
FROM nginx:stable-alpine-slim
COPY --from=build /build/dist/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
