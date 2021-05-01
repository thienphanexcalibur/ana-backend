FROM node:12.19.0-alpine3.9

WORKDIR /app/

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
