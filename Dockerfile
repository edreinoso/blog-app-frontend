FROM node:20 as sc-blog-web-build-container
# using node LTS

WORKDIR /tmp/sc-blog-web

COPY . /tmp/sc-blog-web/

# Build argument for environment variable
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN npm install -g npm@latest && npm install && npm run build

FROM nginx

COPY --from=sc-blog-web-build-container /tmp/sc-blog-web/build/ /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf