#!/bin/sh

docker pull 167.71.149.87:28000/library/gatsby-front
docker-compose stop
docker rm gatsby-front
docker-compose up -d
