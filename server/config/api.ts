const {
    GENERAL__DOMAIN_NAME = "localhost",
    CLIENT__PORT = "4000"
} = process.env;


const api = {
    clientPort: CLIENT__PORT,
    domainName: GENERAL__DOMAIN_NAME,
    clientBaseUrl: `//${GENERAL__DOMAIN_NAME}:${CLIENT__PORT}`
};

export {api}
