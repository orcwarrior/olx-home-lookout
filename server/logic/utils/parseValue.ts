function parseValue(str) {
    return parseFloat(str?.replace(/ |[^0-9.,]/g, "")) || 0;
}

export {parseValue};
