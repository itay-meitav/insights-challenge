# Intsights Darkweb Scraper

This project was collaborated with Rapid7, as part of the Cyber4s program by Scale-Up Velocity.

The goal of the project is to scrape data from a pastes site (like Pastebin) in the dark web.  
The data should be analyzed and saved in a database, and then be presented in a dashboard.

## Technologies:

- **[React](https://reactjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Sass](https://www.npmjs.com/package/sass)**
- **[Express](https://www.npmjs.com/package/express)**
- **[MongoDB](https://www.mongodb.com/)**

## Packages:

- **Front-end** :

  - **[React Router](https://www.npmjs.com/package/react-router-dom)** - For routes management.
  - **[React-Bootstrap](https://www.npmjs.com/package/react-bootstrap)** - For design purposes.

- **Back-end**:
  - **[Node-MongoDB](https://www.npmjs.com/package/mongodb)** - For DB management.
  - **[Http-Proxy-Agent](https://www.npmjs.com/package/http-proxy-agent)** - For the ability to create requests through the container that provides
  us vpn to the dark web.
  - **[Cheerio](https://www.npmjs.com/package/cheerio)** - For scarping the data.
  - **[Webpack](https://www.npmjs.com/package/webpack)** - For modules bundling and build the server side.
  - **[Dotenv](https://www.npmjs.com/package/dotenv)** - For environment variables.

The paste site is scraped from Tor browser.  
The entire application is dockerized using docker-compose.

---

## Run locally

In the root folder run:

```
docker-compose up
```

Note: it might take some time for all the container to build.

When all the containers are running, go to <a href="http://localhost:3000">localhost:3000</a>.

You will then have to wait for the first scrape to complete before any data will be presented in the dashboard.
