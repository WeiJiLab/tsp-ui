#!/bin/sh -xe

. ./auto/set-env-vars

trivy image --exit-code 0 --severity MEDIUM --no-progress --input ${IMAGE_TAR}
trivy image --exit-code 1 --severity HIGH,CRITICAL --no-progress --input ${IMAGE_TAR}

