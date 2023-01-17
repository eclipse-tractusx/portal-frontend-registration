FROM nginxinc/nginx-unprivileged:alpine
COPY .conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
USER root
RUN mv /usr/share/nginx/html/registration/index.html /usr/share/nginx/html/registration/index.html.reference
RUN apk update && apk add bash
USER 101
