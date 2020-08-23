const {version: CLIENT_VER} = require("./package.json");

console.log(`process.env: `, process.env);
const ENV = {
  CLIENT_GRAPHQL_URL_SERVER: process.env.CLIENT_GRAPHQL_URL_SERVER || "http://localhost:8080/v1beta1/relay",
  CLIENT_GRAPHQL_URL_CLIENT: process.env.CLIENT_GRAPHQL_URL_CLIENT || "http://127.0.0.1:8080/v1beta1/relay",
  SHARED_SENTRY_DSN: process.env.SHARED_SENTRY_DSN,
  SERVER_PARSE_APP_ID: process.env.SERVER_PARSE_APP_ID = "LIBIGO_APP",
  HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET = "secret",
  CLIENT_VER
};
console.log("Build time env: ", ENV)

module.exports = ENV;
