#!/bin/sh -e

cd $(dirname $0)/..

. ./auto/set-env-vars

mkdir -p ~/.docker
cat > ~/.docker/config.json <<EOF
    { "credsStore": "ecr-login" }
EOF

/kaniko/executor --dockerfile=`pwd`/Dockerfile --context `pwd` \
    --no-push --destination=${DOCKER_IMAGE}:${TAG} --tarPath "${IMAGE_TAR}"
