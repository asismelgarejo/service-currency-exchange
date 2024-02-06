FROM node:18-alpine as dev

RUN npm install -g typescript

WORKDIR /app

ENV NODE_ENV=prod
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]

