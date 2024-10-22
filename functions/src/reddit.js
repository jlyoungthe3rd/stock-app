const functions = require("firebase-functions");
const snoowrap = require("snoowrap");

const { logger } = require("./utils");

const getSnoowrap = () => {
  const {
    user_agent: userAgent,
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  } = functions.config().reddit;

  return new snoowrap({
    userAgent,
    clientId,
    clientSecret,
    refreshToken,
  });
};

exports.searchDD = functions.https.onRequest((request, response) => {
  const reddit = getSnoowrap();

  response.set('Access-Control-Allow-Origin', '*');
  
  reddit
    .getSubreddit("wallstreetbets")
    .search({
      query: "flair:DD",
      sort: "top",
      time: "week",
    })
    .then((submissions) => {
      return response.send(submissions.slice(0, 10));
    })
    .catch((ex) => {
      logger("Failed to run search: ", ex.statusCode);
      response.sendStatus(ex.statusCode);
    });
});
