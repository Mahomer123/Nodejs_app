FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3009
CMD ["node" , "app.js"]
