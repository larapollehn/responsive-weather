FROM node:alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install --silent

COPY . .

RUN ./node_modules/gulp/node_modules/.bin/gulp

RUN mv dist/all-min.js public/all-min.js

RUN mv public/prod.index.html public/index.html

CMD ["npm", "run", "start"]