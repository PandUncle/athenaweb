#!/bin/sh

curpath=`pwd`


buildImage() {
  cd $curpath

  # build frontend image
  rm -rf ./public
  rm -rf ./docker/images/public
  yarn build
  cp -rf ./public ./docker/images/
  cd docker/images
  docker build -t 167.71.149.87:28000/library/gatsby-front ./
  docker push 167.71.149.87:28000/library/gatsby-front

  cd $curpath
}

echo '###### building for docker images ... ...'

buildImage

cd $curpath

