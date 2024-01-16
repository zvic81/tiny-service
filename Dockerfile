FROM node:18-alpine
#FROM arm64v8/node:16.5.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

#RUN apk add --update nodejs npm

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]