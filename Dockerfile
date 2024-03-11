FROM node:20 as blog-web-build-container
# using node LTS

WORKDIR /tmp/blog-web

COPY . /tmp/blog-web/

# Build argument for environment variable
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN npm install -g npm@latest && npm install && npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine

COPY --from=blog-web-build-container /tmp/blog-web/build/ /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf