FROM node:lts-alpine

WORKDIR /usr/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD [ "npm", "start" ]