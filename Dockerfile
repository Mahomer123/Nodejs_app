FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4002
CMD ["node" , "app.js"]
