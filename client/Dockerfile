FROM node:lts-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . ./


FROM node:lts-alpine as build 
WORKDIR /app
ENV GENERATE_SOURCEMAP=false
COPY --from=development /app .
RUN npm run build


FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

