import initDb from "../db/schemas/init";

import scrapeAdsList from "../logic/scrapeAdsList";
import {LookoutRequest} from "../db/schemas/";


(async () => {
    await initDb();
    const [request] = await LookoutRequest.find({where: {id: 1}});
    await scrapeAdsList(request);

})();
