FROM node:10
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3001
CMD [ "node", "gateway.js" ]