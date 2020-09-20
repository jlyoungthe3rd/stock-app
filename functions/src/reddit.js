const functions = require("firebase-functions");
const snoowrap = require("snoowrap")

const r = new snoowrap(functions.config().reddit);

r.getSubreddit('wallstreetbets').search({ q: "flair:DD", sort: "top", time: "week" })

exports.searchDD = () => {}