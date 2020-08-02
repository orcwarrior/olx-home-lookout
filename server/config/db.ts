import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import {namingStrategy} from "../db/naming";

const {
    SERVER__DB_NAME = "homelookoutdb",
    SERVER__DB_SCHEMA = "public",
    SERVER__DB_DROP = false,
    SERVER__DB_SEED = false,
    SERVER__DB_INIT_ONCE = true,
    POSTGRES__PG_DB = "postgres",
    POSTGRES__USER = "admin",
    POSTGRES__PASSWORD = "strongpwd",
    POSTGRES__HOST = "localhost",
    POSTGRES__PORT = "5432",
    NODE_ENV
} = process.env;

const isDev = NODE_ENV === "development" || !NODE_ENV;

const postgresUrl = `postgres://${POSTGRES__USER}:${POSTGRES__PASSWORD}@${POSTGRES__HOST}:${POSTGRES__PORT}`;

const dropDb = SERVER__DB_DROP !== undefined && !!JSON.parse(String(SERVER__DB_DROP));
const seedDb = SERVER__DB_SEED !== undefined && !!JSON.parse(String(SERVER__DB_SEED));

const dbCredentials = {
    database: SERVER__DB_NAME,
    user: POSTGRES__USER,
    password: POSTGRES__PASSWORD,
    host: POSTGRES__HOST,
};

interface dbConfig {
    typeOrmConnection: PostgresConnectionOptions,
    dropDb: boolean,
    seedDb: boolean,

    [key: string]: any
}

const dbUri = `${postgresUrl}/${SERVER__DB_NAME}`;
const db: dbConfig = {
    ...dbCredentials,
    knexConnection: dbCredentials,
    typeOrmConnection: {
        type: "postgres",
        url: dbUri,
        dropSchema: dropDb,
        synchronize: dropDb,
        schema: SERVER__DB_SCHEMA,
        namingStrategy: namingStrategy,
    },

    dbName: SERVER__DB_NAME,
    pgDbName: POSTGRES__PG_DB,
    schemaName: SERVER__DB_SCHEMA,
    uri: dbUri,
    defaultDbUri: `${postgresUrl}/${POSTGRES__PG_DB}`,
    dropDb,
    seedDb,
    initDbOnce: SERVER__DB_INIT_ONCE && (dropDb || seedDb)
};

export default db;
