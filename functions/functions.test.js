const Subreddit = {
  search: jest.fn(),
};
const SnoowrapClient = {
  getSubreddit: jest.fn(() => Subreddit),
};

jest.mock("snoowrap");
const snoowrap = require("snoowrap");
snoowrap.mockImplementation(() => SnoowrapClient);

jest.mock("firebase-functions", () => ({
  https: {
    onRequest: jest.fn((x) => x),
  },
  config: () => ({
    reddit: {
      user_agent: "userAgent",
      client_id: "clientId",
      client_secret: "clientSecret",
      refresh_token: "rToken",
    },
  }),
}));
const firebaseFunctions = require("firebase-functions");
const baseFunctions = require("./index.js");
const redditClient = require("./src/reddit");

/**
 * What does the reddit client need to do
 *
 * On request, it needs to:
 *   1. authenticate
 *   2. touch the wallstreetbets subreddit for a given flair
 *   3. return postxs with that flair (top ten in the last week)
 */
describe("Reddit API pulling", () => {
  const request = {
    params: [],
  };
  const response = {
    send: jest.fn(),
  };

  beforeEach(() => {
    Subreddit.search.mockRestore();
    Subreddit.search.mockImplementation(() => Promise.resolve("data"))
  });

  it("should import functions from the src folder and export them", () => {
    expect(baseFunctions.reddit).toBe(redditClient);
  });

  it("should load in authentication details", () => {
    baseFunctions.reddit.searchDD(request, response);
    // create a new snoowrap instance called with firebase func variables
    const {
      user_agent: userAgent,
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    } = firebaseFunctions.config().reddit;
    expect(snoowrap).toHaveBeenCalledWith({
      userAgent,
      clientId,
      clientSecret,
      refreshToken,
    });
  });

  it("should return submission from r/wallstreetbets subreddit", () => {
    const listings = [Math.random()];
    Subreddit.search.mockImplementation(() => Promise.resolve(listings));

    expect(Subreddit.search).toHaveBeenCalledTimes(0);

    baseFunctions.reddit.searchDD(request, response);

    setTimeout(() => {
      expect(SnoowrapClient.getSubreddit).toHaveBeenCalledWith("wallstreetbets");
      expect(Subreddit.search).toHaveBeenCalledWith({
        q: "flair:DD",
        sort: "top",
        time: "week",
      });
  
      expect(response.send).toHaveBeenCalledWith(listings);
    }, 500);
  });
});
