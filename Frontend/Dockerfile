FROM node:16-slim

WORKDIR /Frontend
COPY . /Frontend/

RUN npm ci

ENV Frontend=true
ENV PORT=3000

CMD [ "npm", "start" ]

