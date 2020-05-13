FROM node:alpine

RUN mkdir /client
ADD . /client/
WORKDIR /client
RUN npm install

CMD npm run start;

EXPOSE 3000
