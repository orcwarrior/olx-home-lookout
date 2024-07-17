import express from "express";
import  bodyParser from "body-parser";
import {api} from "../config";

import eventsRouter from "./events/events";

import queryAddressRouter from "./geo/queryAddressGeo";
import genOfferMapRouter from "./geo/generateOfferMapImages";

const app = express();


// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.use(bodyParser.json());
app.use(eventsRouter);
app.use("/api/geo/", queryAddressRouter);
app.use("/api/geo/", genOfferMapRouter);
app.use("/static", express.static("static"));

// start the Express server
app.listen(api.serverPort, () => {
    console.log(`server started at http://localhost:${api.serverPort}`);
});
