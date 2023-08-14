FROM node:alpine as builder

WORKDIR /home
ADD . /home

#############################################
# for production build
# RUN yarn install && yarn build

#############################################
# for development build
RUN yarn install \
    && sed -i 's/'\''build'\''/'\''dist'\''/g' ./node_modules/react-scripts/config/paths.js \
    && sed -i 's/'\''..\/..\/build'\''/'\''..\/..\/dist'\''/g' ./node_modules/react-scripts/config/paths.js \
    && sed -i 's/'\''production'\''/'\''development'\''/g' ./node_modules/react-scripts/scripts/build.js \
    && yarn build


FROM nginx

RUN rm -rf /usr/share/nginx/html/*

#############################################
# for production build
# COPY --from=builder /home/build/ /usr/share/nginx/html/

#############################################
# for development build
COPY --from=builder /home/dist/ /usr/share/nginx/html/

EXPOSE 80
ENTRYPOINT nginx & tail -f /dev/null