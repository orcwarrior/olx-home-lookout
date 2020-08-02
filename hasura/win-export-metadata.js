const elevate = require("windows-elevate");

try {
    elevate.exec("npm", [`run-script`, `metadata:export`], (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            throw error;
        }
        console.log({stdout});
    });
} catch (err) {
    console.log(`elevate cmd.err: `, err);
}
