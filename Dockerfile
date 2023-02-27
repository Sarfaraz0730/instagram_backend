FROM node:lts-alpine as base

RUN apk add dumb-init

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

FROM node:lts-alpine as production


RUN apk add dumb-init

WORKDIR /home/node/app

COPY package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV production
ENV NODE_PATH=./build

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["dumb-init", "node", "build/index.js"]