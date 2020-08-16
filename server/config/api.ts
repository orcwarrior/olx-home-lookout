const {
    GENERAL__DOMAIN_NAME = "localhost",
    CLIENT__PORT = "4000",
    GOOGLE_MAPS_API_KEY
} = process.env;


const api = {
    clientPort: CLIENT__PORT,
    domainName: GENERAL__DOMAIN_NAME,
    clientBaseUrl: `//${GENERAL__DOMAIN_NAME}:${CLIENT__PORT}`,
    GOOGLE_MAPS_API_KEY,
};

export {api}
