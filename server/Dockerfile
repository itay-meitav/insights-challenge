# Stage 1 - Installing app dependencies
FROM node:lts-alpine as development

WORKDIR /app

COPY ["package*.json", "./"]

RUN npm install

COPY . .

ENV NODE_ENV=development
ENV HTTP_PROXY=http://tor:8118

EXPOSE 5000

# Stage 2 - Building the app
FROM node:lts-alpine as build

WORKDIR /app

COPY --from=development /app ./

RUN npm run build

# Stage 3 - Serving the app
FROM node:lts-alpine as production

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm install 

COPY --from=build /app/build ./build

ENV NODE_ENV=production

CMD ["npm","start"]

