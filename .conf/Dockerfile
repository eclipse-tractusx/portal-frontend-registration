FROM nginxinc/nginx-unprivileged:alpine
COPY .conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
# Change to root user for renaming of index.html to index.html.reference, to be used by env variables inject script
USER root
RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html.reference
# Install bash for env variables inject script
RUN apk update && apk add bash
# Change to nginx user
USER 101
# Add env variables inject script
COPY ./scripts/inject-dynamic-env.sh /docker-entrypoint.d/00-inject-dynamic-env.sh
