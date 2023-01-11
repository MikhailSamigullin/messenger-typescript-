FROM ubuntu:20.04
RUN apt-get update && apt-get install -y nodejs && apt-get install -y npm 
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm install
RUN npm run docker
CMD node app.js
