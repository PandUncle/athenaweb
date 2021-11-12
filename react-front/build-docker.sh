#!/bin/sh

curpath=`pwd`


buildImage() {
  cd $curpath

  # build frontend image
  rm -rf ./dist
  rm -rf ./docker/images/dist
  yarn build
  cp -rf ./dist ./docker/images/
  cd docker/images
  docker build -t 167.71.149.87:28000/library/react-front ./
  docker push 167.71.149.87:28000/library/react-front

  cd $curpath
}

echo '###### building for docker images ... ...'

buildImage

cd $curpath

