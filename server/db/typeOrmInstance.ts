import {Connection, ConnectionManager, QueryBuilder} from "typeorm";
import initDb from "../db/schemas/init";


let instance: Promise<Connection>;
if (!instance) instance = initDb();

async function getQueryBuilder<T>(): Promise<QueryBuilder<T>> {
    return (await instance).createQueryBuilder();
}

export {getQueryBuilder};
export default instance;
