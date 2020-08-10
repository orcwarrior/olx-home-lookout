const GRAPHQL = {
    URL_SERVER: process.env.CLIENT_GRAPHQL_URL_SERVER,
    URL_CLIENT: process.env.CLIENT_GRAPHQL_URL_CLIENT,
    get URL() {
        return (process.browser) ? this.URL_CLIENT : this.URL_SERVER;
    }
};

const LIBIGO_VER = process.env.LIBIGO_VER;
const SHARED_SENTRY_DSN = process.env.SHARED_SENTRY_DSN;

const THEME_COLOR = {

    LIGHT: {BASE: "#e2e2e2"},
    DARK: {BASE: "#333333"},
};

export {
    GRAPHQL,
    SHARED_SENTRY_DSN,
    THEME_COLOR,
    LIBIGO_VER
};
