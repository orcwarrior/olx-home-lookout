const {
    GENERAL__DOMAIN_NAME = "localhost",
    GENERAL__ORIGIN = "http://localhost",
    SERVER__PORT = "4000",
    CLIENT__PORT = "80",
    GOOGLE_MAPS_API_KEY,
    SERVER__SENDGRID_API_KEY,
    SERVER__EMAIL_SENDER
} = process.env;


const api = {
    serverPort: SERVER__PORT,
    domainName: GENERAL__DOMAIN_NAME,
    serverBaseUrl: `${GENERAL__ORIGIN}:${SERVER__PORT}`,
    clientBaseUrl: `${GENERAL__ORIGIN}${CLIENT__PORT ?`:${CLIENT__PORT}`:""}`,
    GOOGLE_MAPS_API_KEY,
    SERVER__SENDGRID_API_KEY,
    SERVER__EMAIL_SENDER,
};
console.log(`GOOGLE_MAPS_API_KEY: `, GOOGLE_MAPS_API_KEY)
export {api}
