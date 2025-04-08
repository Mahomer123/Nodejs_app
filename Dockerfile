FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4001
CMD ["node" , "app.js"]
