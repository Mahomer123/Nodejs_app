FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3008
CMD ["node" , "app.js"]
