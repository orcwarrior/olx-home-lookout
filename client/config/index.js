const GRAPHQL = {
  URL_SERVER: process.env.CLIENT_GRAPHQL_URL_SERVER,
  URL_CLIENT: process.env.CLIENT_GRAPHQL_URL_CLIENT,
  get URL() {
    return (process.browser) ? this.URL_CLIENT : this.URL_SERVER;
  }
};
console.log(`GRAPHQL: `, GRAPHQL);

const CLIENT_VER = process.env.CLIENT_VER;
const GENERAL__ORIGIN = process.env.GENERAL__ORIGIN;
const SHARED_SENTRY_DSN = process.env.SHARED_SENTRY_DSN;

export {
  GRAPHQL,
  SHARED_SENTRY_DSN,
  CLIENT_VER,
  GENERAL__ORIGIN

};
