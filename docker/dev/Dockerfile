FROM node:10.13.0-alpine

LABEL MAINTAINER="Victor Ugwueze<victorugwueze@gmail.com>"
LABEL application="reachout-backend"

ENV TERM=xterm-256color

WORKDIR /usr/app

RUN apk update && apk upgrade && apk add python make g++ --no-cache && \
  npm install -g yarn@1.12.x && npm install -g node-pre-gyp && rm -rf package-lock.json
COPY package.json /usr/app
COPY yarn.lock /usr/app

RUN yarn install
