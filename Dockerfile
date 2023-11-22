FROM node:20-alpine

WORKDIR /app/node-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5353

CMD ["npm", "run", "start"]