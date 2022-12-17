FROM node:lts-alpine as development
WORKDIR /app
COPY ["package*.json", "./"]
RUN npm install
COPY . .
ENV NODE_ENV=development
ENV SOCKS_PROXY=http://tor:8118


FROM node:lts-alpine as build
WORKDIR /app
COPY --from=development /app .
RUN npm run build


FROM node:lts-alpine as production
WORKDIR /app
COPY --from=build /app ./
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
CMD ["npm","start"]