import Knex = require("knex");
import knexPostgis = require("knex-postgis");
import {db} from "./config";

let knexClient: Knex<any, unknown[]>;
try {
    knexClient = Knex({
        client: "pg",
        connection: db.knexConnection,
        searchPath: [db.schemaName],
        pool: {
            min: 4,
            max: 10,
            // @ts-ignore
            createTimeoutMillis: 3000,
            acquireTimeoutMillis: 30000,
            idleTimeoutMillis: 30000,
            reapIntervalMillis: 1000,
            createRetryIntervalMillis: 500,
            propagateCreateError: false // <- default is true, set to false
        }
    });
} catch (err) {
    console.warn("Knex connection error: ", err);
}
const postgis_st = knexPostgis(knexClient);

export {postgis_st};
export default knexClient;
