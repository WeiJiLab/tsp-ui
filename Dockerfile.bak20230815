FROM nginx:1.19.9

# Dockerfile Describe
LABEL MAINTAINER="TSP Platform" \
			RUNTIME=NGINX \
      TECHSTACK=WEB \
      OS=ALPINE

WORKDIR /app

COPY --chown=1000:1000 ./vhost.conf /etc/nginx/conf.d/vhost.conf
COPY --chown=1000:1000 ./build/ ./

RUN chown -R 1000:1000 /app && chmod -R 755 /app && \
        chown -R 1000:1000 /var/cache/nginx && \
        chown -R 1000:1000 /var/log/nginx && \
        chown -R 1000:1000 /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R 1000:1000 /var/run/nginx.pid
USER 1000

EXPOSE 8000

# USER root
# RUN apk add --no-cache tzdata \
#     && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# User must be uid is 1000
# USER 1000

# Mast Modify this CMD with you own
# CMD ["nginx", "-g", "daemon off;"]