FROM node:alpine as builder

WORKDIR /home
ADD . /home

RUN yarn install && yarn build

FROM nginx

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /home/build/ /usr/share/nginx/html/

EXPOSE 80
ENTRYPOINT nginx & tail -f /dev/null