import * as path from "path";
import * as glob from "glob";
import knexClient from "../../knexClient";
import {promisify} from "util";
import Knex = require("knex");
import {db} from "../../config";
import {createConnection} from "typeorm";

const globPromise = promisify(glob);


type SchemaTuple = { initFn: (knexClient: Knex<any, unknown[]>) => Promise<any>; model: string };

function prepareFiles(prefix = "./"): Promise<SchemaTuple[]> {
    return globPromise(`${prefix}!(init|utils|index)@(.js|.ts)`, {cwd: __dirname})
        .then(async (files) => {

            const filesImport = files.map(file => ({
                initFn: async (knexClient) => {
                    const {default: initTable} = (await import(file));
                    return initTable(knexClient);
                },
                model: _getModelName(file)
            }));

            return filesImport;
        });

    function _getModelName(fixturePath) {
        const filename = path.basename(fixturePath);
        return filename.split(".")[0];
    }
}

import * as entities from "./index";

let typeOrmConnection;

async function initSchemas() {
    if (typeOrmConnection) {
        console.log("Database typeORM connection already initied");
        return typeOrmConnection;
    }
    console.log(`Initing database schemas ... (${Object.keys(entities)})`);

    typeOrmConnection = await createConnection({
        ...db.typeOrmConnection,
        entities: Object.values(entities),
        synchronize: db.dropDb
    });

    if (db.dropDb) {
        const preparedAddons = await prepareFiles("./addons/");
        await Promise.all(preparedAddons.map(({initFn, model}) => {
            console.trace(`Initing ${model} (addon) ...`);
            return initFn(knexClient);
        }));
    }

    console.log("Schema initialization done!");
    return typeOrmConnection;
}

export default initSchemas;
