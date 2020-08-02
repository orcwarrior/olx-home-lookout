import db from "./db";
import {api} from "./api";

const {
    NODE_ENV = "development"
} = process.env;

export {api, db, NODE_ENV};
