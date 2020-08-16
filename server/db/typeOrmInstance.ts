import {Connection, SelectQueryBuilder, QueryBuilder} from "typeorm";
import initDb from "../db/schemas/init";
// import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";


let instance: Promise<Connection>;
if (!instance) instance = initDb();

async function getQueryBuilder<T>(): Promise<SelectQueryBuilder<T>> {
    return (await instance).createQueryBuilder();
}

export {getQueryBuilder};
export default instance;
