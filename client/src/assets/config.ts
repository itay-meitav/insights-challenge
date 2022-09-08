const config = {
  apiHost: process.env.NODE_ENV == "development" ? "//localhost:5000" : "",
};
export default config;
