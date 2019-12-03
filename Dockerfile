FROM nginx

COPY ./dist/ /usr/share/nginx/html/
COPY ./vhost.nginx.conf /etc/nginx/conf.d/vue-h5-common-template.conf

EXPOSE 80