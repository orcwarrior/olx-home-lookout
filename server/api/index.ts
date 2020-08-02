import * as express from "express";
import * as bodyParser from "body-parser";
import {api} from "../config";

import eventsRouter from "./events/events";

const app = express();


// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.use(bodyParser.json());
app.use(eventsRouter);

// start the Express server
app.listen(api.clientPort, () => {
    console.log(`server started at http://localhost:${api.clientPort}`);
});
