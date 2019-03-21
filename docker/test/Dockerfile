FROM node:10.13.0-alpine

LABEL MAINTAINER="Victor Ugwueze<victorugwueze@gmail.com>"
LABEL application="reachout-backend"

ENV TERM=xterm-256color

WORKDIR /usr/app

RUN apk update && apk upgrade && \
  npm install -g yarn@1.12.x && rm -rf package-lock.json
COPY package.json /usr/app
COPY yarn.lock /usr/app

RUN yarn install

COPY server/ /usr/app/server
COPY .sequelizerc /usr/app
COPY .babelrc /usr/app
COPY .eslintrc /usr/app
COPY docker/test/entrypoint.sh /usr/app
RUN ["chmod", "+x", "/usr/app/entrypoint.sh"]
ENTRYPOINT [ "/usr/app/entrypoint.sh" ]
