FROM node:lts-alpine as development

WORKDIR /app

COPY ["package*.json",  "./"]

RUN npm install

COPY . .

EXPOSE 3000


FROM node:lts-alpine as build

WORKDIR /app

ENV GENERATE_SOURCEMAP=false

COPY --from=development /app ./

RUN npm run build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
