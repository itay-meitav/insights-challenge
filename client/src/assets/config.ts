export default {
  apiHost:
    process.env.NODE_ENV == "development"
      ? "//localhost:5000/"
      : window.location.href,
};
