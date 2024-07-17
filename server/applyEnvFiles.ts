import  fs from "fs";
import  path from "path";

//@ts-ignore
if (process.env.RUNTIME_ENVIROMENT === "docker_compose") return;
// This applies only to local running, not in containers


const dotenv = require("dotenv");
const ENVS_PATH = "../";
const envFiles = ["local.env", "secret.env"];

console.log(`---
Local Enviroment Detected
Loading .env files from "${ENVS_PATH}" ...`);
envFiles.forEach(_applyEnvFile);
console.log("---");

function _applyEnvFile(filename) {
    const envPath = `${ENVS_PATH}/${filename}`;
    const localEnvExists = fs.existsSync(path.resolve(envPath));

    if (localEnvExists) {
        const {error, parsed} = dotenv.config({path: envPath});
        const outcomeMsg = (error) ? `ERROR: ${error}` : `parsed ${Object.keys(parsed).length} keys!`;

        console.log(`Loaded env: ${filename} / ${outcomeMsg}`);
    }
}
