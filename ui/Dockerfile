FROM node:10
COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm","start"]