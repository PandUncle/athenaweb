#!/bin/sh

docker pull 167.71.149.87:28000/library/react-front
docker-compose stop
docker rm react-front
docker-compose up -d
