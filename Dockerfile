FROM node:18

RUN mkdir -p /home/app

WORKDIR /home/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

ADD ./src ./src
ADD ./public ./public

CMD ["node", "src/server.js"]