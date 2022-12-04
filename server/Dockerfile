FROM node:lts-alpine

WORKDIR /app

COPY ["package*.json", "./"]

RUN npm install --silent && mv node_modules ../

COPY . .

ENV NODE_ENV=development

EXPOSE 5000

CMD ["npm", "run" ,"dev"]