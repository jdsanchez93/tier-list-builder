#!/bin/bash
IMAGE_TAG=$1
IMAGE_PREFIX="jdeeezy/webcam-image-viewer:"
IMAGE_NAME="$IMAGE_PREFIX$IMAGE_TAG"

docker build . --file Dockerfile --tag $IMAGE_NAME
docker push $IMAGE_NAME

# push tag if second arg is not blank
if [ ! -z "$2" ]; then
    git tag $2
    git push origin --tags
fi

echo "::set-output name=image::$IMAGE_NAME"