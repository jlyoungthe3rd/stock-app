const functions = require('firebase-functions');

const logger = (...args) => {
    console.log(args);
    functions.logger.info(args, {structuredData: true});
};

exports.utils = {
    logger
};