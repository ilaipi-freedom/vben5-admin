FROM nginx:1.25.1-alpine3.17
COPY ./apps/web-arco/dist /usr/share/nginx/html/dist
COPY ./nginx.conf /etc/nginx/nginx.conf
