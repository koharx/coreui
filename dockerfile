FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g http-server

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["http-server", "build", "-p", "8080"]