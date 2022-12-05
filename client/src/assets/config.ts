export default {
  apiHost: process.env.NODE_ENV == "development" ? "//localhost:5000/" : "/",
};
