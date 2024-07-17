import  _ from "lodash";
import  sqlFixtures from "sql-fixtures";
import  fs from "fs";
import  path from "path";
import {promisify, inspect} from "util";
import {db, NODE_ENV} from "@config/index";
import {getJoinTableName, modelNameToTableName} from "../utils";

const glob = promisify(require("glob"));


interface SeedMetainfos {
    fixture: Function,
    fixturePath: string
}

interface SeedDictionary {
    [s: string]: Array<Object>
}

async function startupSeed({subfolder = NODE_ENV} = {}) {

    console.log("Seeding database data ...");

    const fixturesInstance = new sqlFixtures({client: "postgres", connection: db.uri});

    subfolder = subfolder || process.argv[2] || NODE_ENV;
    return glob(`./${subfolder}/*.fixtures.*(ts|js)`, {cwd: __dirname}).then(async fixturesPaths => {
        const timestamp = new Date().valueOf();
        // const baseFiles = fixturesPaths.filter(p => !p.includes("/_mixed."));
        // const mixedFiles = fixturesPaths.filter(p => p.includes("/_mixed."));
        const loadedFixtures = fixturesPaths.map(fixturePath => ({
            fixture: require(`./${fixturePath}`).default,
            fixturePath
        }));
        console.log("Fixtures: ", loadedFixtures.map(({fixturePath}) => fixturePath));

        let dataSpec = {};
        loadedFixtures.forEach(composeFixtures(dataSpec));

        const enchancedDataSpec = enchanceFixtures(dataSpec);

        try {
            const seedResult = await fixturesInstance.create(enchancedDataSpec);
            const seedStats = _.map(seedResult, (res) => res.length);
            console.log(`DB Seed ended, stats: `, seedStats);
            return {stats: seedStats, statsSeedTimeMS: (new Date().valueOf() - timestamp)};
        } catch (err) {
            console.warn("seed errror: ", err);
        }
        // postSeed();
    });
}

function composeFixtures(orginalSpec) {

    function resolveFn(table, whereQuery) {
        return (dataSpec, fixtureIdx, selfTable) => {
            if (!dataSpec[table]) console.warn({allTables: Object.keys(dataSpec), fixtureIdx, selfTable, table});

            const matchedIdx = dataSpec[table].findIndex(_.matches(whereQuery));
            if (matchedIdx === -1) {
                console.warn({lookupTable: dataSpec[table]});
                throw new Error(`No matched index for ${table} query: ${JSON.stringify(whereQuery)} at ${selfTable}.${fixtureIdx}`);
            }

            return `${table}:${matchedIdx}`;
        };
    }

    function joinFn(otherTable, whereQuery) {

        return (/* trick to ignore first pass */) => (dataSpec, fixtureIdx, selfTable) => {
            const matchedIdxs = _queryOtherTable(dataSpec[otherTable], whereQuery);
            const joinTableName = getJoinTableName(selfTable, otherTable);
            const joinRows = matchedIdxs.map(idx => ({
                [`${_.camelCase(selfTable)}Id`]: `${selfTable}:${fixtureIdx}`,
                [`${_.camelCase(otherTable)}Id`]: `${otherTable}:${idx}`
            }));
            if (!dataSpec[joinTableName]) dataSpec[joinTableName] = joinRows;
            else joinRows.forEach(row => dataSpec[joinTableName].push(row)); // Muttable :/
            return undefined; // this column aren't defined for that table so we cannot set value!
        };

        function _queryOtherTable(table = [], queries) {
            return Object.entries(table)
                .filter(([idx, row]) => queries.some(query => _.isMatch(row, query)))
                .map(([idx]) => idx);
        }
    }

    const get = (val) => () => val;


    return function ({fixture, fixturePath}) {
        const tableName = _getTableName(fixturePath);
        const normalizedFixture = (tableName === TABLE_NAME_MIXED)
            ? _extractMixedFixtures(fixture(resolveFn, joinFn, get))
            : {[tableName]: fixture(resolveFn, joinFn, get)};

        Object.entries(normalizedFixture).forEach(([key, val]: any[]) =>
            orginalSpec[key] = [...orginalSpec[key] || [], ...val]);

    };

    function _extractMixedFixtures(fixtures = []) {
        // const extractedFixtures = _.groupBy(fixtures, (f) => modelNameToTableName(f.__model));
        const extractedFixtures = fixtures.reduce((acc, fixture) => {
            if (!fixture.__model)
                console.warn(`EMPTY!: fixture.__model:`, fixture);
            const name = modelNameToTableName(fixture.__model);
            return {...acc, [name]: [...acc[name] || [], fixture]};
        }, {});

        return extractedFixtures;
    }

    function _getTableName(fixturePath) {
        const filename = path.basename(fixturePath);
        if (filename.includes("mixed.fixtures"))
            return TABLE_NAME_MIXED;
        else {
            const modelName = filename.split(".")[0];
            return modelNameToTableName(modelName);
        }
    }
}

const TABLE_NAME_MIXED = "_MIXED";


function enchanceFixtures(dataSpec) {

    function _processFixturesPass(currentSpec, rowFn = (row) => row) {

        const changedSpec = Object.entries(currentSpec)
            .reduce((acc, [tableName, fixtures]) => ({
                ...acc,
                [tableName]: __processFixtureTable(fixtures, tableName)
            }), {});
        return {...currentSpec, ...changedSpec}; // DK: To preserve base of mutated obj


        function __processFixtureTable(fixtures, tableName) {
            const __processValueFunc = (fixtureIdx) => (val) => _.isFunction(val) ? val(currentSpec, fixtureIdx, tableName) : val;

            return fixtures.map((fixture, idx) => _.map(fixture, (val) => {
                const _processForThisFixture = __processValueFunc(idx);
                return Array.isArray(val) ? val.map(_processForThisFixture) : _processForThisFixture(val);
            })).map(rowFn);
        }
    }

    // DK: Escapes colons
    function _initialProcessing(currentSpec) {

        const _strEscapeColon = (val) => {
            if (typeof val !== "string")
                return val;

            return val.replace(/:/g, "::");
        };
        const escapeColon = (val) => {
            if (Array.isArray(val)) return val.map(_strEscapeColon);
            else if (typeof val === "string") return _strEscapeColon(val);
            return val;
        };

        return Object.entries(currentSpec)
            .reduce((acc, [tableName, fixtures]: any[]) => ({
                ...acc,
                [tableName]: fixtures.map(row => _.map(row, escapeColon))
            }), {});
    }

    function _stripInternalFields({__model, __idx, ...row}) {
        return row;
    }

    const initialPass = _initialProcessing(dataSpec);
    const firstPassSpec = _processFixturesPass(initialPass);  // DK: First pass resolve basic resolveFn & get
    const finalSpec = _processFixturesPass(firstPassSpec, _stripInternalFields);    // DK: Second can use results of first pass
    console.log(`Models generated properly!`);

    return finalSpec; // DK: This one can be repeated as much as you want to
}

export default startupSeed;
