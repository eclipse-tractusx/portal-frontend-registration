FROM nginxinc/nginx-unprivileged:alpine
COPY .conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
USER 101
