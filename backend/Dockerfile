FROM node:18

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y netcat-openbsd dos2unix

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./

COPY src ./src

COPY src/wait-for-db.sh ./wait-for-db.sh

RUN dos2unix wait-for-db.sh
RUN chmod +x wait-for-db.sh

RUN npm run build

EXPOSE 3000

CMD ["./wait-for-db.sh"]
