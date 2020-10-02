const functions = require('firebase-functions');
const redditClient = require('./src/reddit');

exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

exports.reddit = redditClient;
