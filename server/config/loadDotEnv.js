const envFiles = [
    // "../../.env",
    "../../local.env"];

if (process.env.RUNTIME_ENVIROMENT !== "docker_compose") {
    const fs = require("fs"), path = require("path");
    const dotenv = require("dotenv");

    envFiles.map(_processEnvFile);

    function _processEnvFile(relativePath) {
        const fullPath = path.resolve(path.dirname(module.filename), relativePath);
        const pathExists = fs.existsSync(fullPath);
        if (pathExists) {
            console.log(`Applying ${relativePath.replace(/\.\.\//g, "")}`);
            dotenv.config({path: fullPath});
        }
    }
}
