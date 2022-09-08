FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["deploy/package*.json", "./"]
RUN npm ci --production 
# --silent && mv node_modules ../
COPY ./deploy/ .
EXPOSE 5000
ENV DATABASE_URL=postgres://quhoklmujkkcws:6bdbd3054c0f4258ec3c0faaa8ed8b34249957a2569241bf80653ffd25302a62@ec2-34-253-119-24.eu-west-1.compute.amazonaws.com:5432/d88qsef0e8riaf
ENV PORT=5000
# RUN chown -R node /usr/src/app
# USER node
CMD ["node", "server"]
