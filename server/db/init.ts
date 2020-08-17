import {db} from "../config";
import {createDbIfNotExists} from "./utils";
import initSchemas from "./schemas/init";
import seedDatabase from "./seeds/init";


(async () => {
    const {dropDb, seedDb, uri, initDbOnce} = db;
    console.log("DB Config: ", {dropDb, seedDb, initDbOnce});
    const dbExisted = !(await createDbIfNotExists());

    console.log(`Connecting to db: ${uri}`);
    if (db.initDbOnce && dbExisted) {
        console.log("SERVER__DB_INIT_ONCE is true, and DB was already inited, skipping init...");
        return process.exit();
    }

    if (dropDb) await initSchemas();
    if (seedDb) await seedDatabase();

    console.log("DB initialization finished!");
    return;
})();
