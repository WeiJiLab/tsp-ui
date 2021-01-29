#!/bin/sh -e

cd $(dirname $0)/..

. ./auto/set-env-vars

mkdir -p ~/.docker
cat > ~/.docker/config.json <<EOF
    { "credsStore": "ecr-login" }
EOF

/kaniko/crane push ${IMAGE_TAR} ${DOCKER_IMAGE}:${TAG}
/kaniko/crane push ${IMAGE_TAR} ${DOCKER_IMAGE}:latest
