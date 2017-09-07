FROM node:6.9.1

# Create app directory
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./index.js .

RUN npm install

EXPOSE 8090

CMD [ "npm", "start" ]
