import * as path from "path";
import {snakeCase} from "lodash";
// import * as pluralize from "pluralize";
import {Knex, knex} from "knex";
import {db} from "@config/index";
import {namingStrategy} from "./naming";
import knexClient from "@root/knexClient";

type KnexInstance = Knex<any, unknown[]>;
export type SchemaExecutor = (knex: KnexInstance) => Promise<any>

export function getTableNameByFilename(callerModule) {

    const filename = path.basename(callerModule.filename);
    const noExtensionPath = filename.split(".").slice(0, -1).join(".");
    return modelNameToTableName(noExtensionPath);
}

export function modelNameToTableName(modelName) {

    return namingStrategy.tableName(modelName);
}

export function createViewSQL(view: string, fields: string[], table: string) {
    return `
CREATE OR REPLACE VIEW ${view} AS
  SELECT ${fields.join(", ")}
    FROM "${table}"`;

}

export function getJoinTableName(leftTable: string, rightTable: string) {
    return namingStrategy.joinTableName(leftTable, rightTable);
}

let knexPreClient: KnexInstance;

export async function createDbIfNotExists() {

    console.log(`Pre-Connect to default-db: ${db.defaultDbUri}`);
    if (!knexPreClient) knexPreClient = initKnex();

    const {rows: [row]} = await knexPreClient.raw(`SELECT EXISTS(SELECT datname FROM pg_catalog.pg_database WHERE datname = '${db.dbName}')`);
    console.log(`dbExists: `, row.exists);

    if (!row || !row.exists) {
        await knexPreClient.raw(`CREATE DATABASE ${db.dbName}`);
        console.log(`Create pgcrypto in: ${db.typeOrmConnection.url}`);
        await knexClient.raw(`CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;`);
        await knexPreClient;
        return true;

    }
    return false;
}


function initKnex() {
    let client;
    try {
        console.log("initializing knexClient...");
        client = knex({
            client: "pg",
            connection: {...db.knexConnection, database: db.pgDbName},
            searchPath: [db.schemaName],
            pool: {
                min: 1,
                max: 10,
                acquireTimeoutMillis: 30000,
                idleTimeoutMillis: 30000,
                reapIntervalMillis: 1000,
                // @ts-ignore
                propagateCreateError: false, // <- default is true, set to false
            }
        });
    } catch (err) {
        console.warn("knex-pre-client.err: ", err);
    }
    return client;
}
