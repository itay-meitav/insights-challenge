FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY deploy/package*.json /app
RUN ls -a && npm ci --only=production 
# --silent && mv node_modules ../
COPY ./deploy/ .
EXPOSE 5000

# RUN chown -R node /usr/src/app
# USER node
CMD ["node", "index"]
