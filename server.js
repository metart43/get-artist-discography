const express = require("express");
const app = express();
const Twitter = require("twitter-lite");
const getAlbums = require("./getSongs");
const fs = require("fs");

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

app.use(express.static("public"));

app.get("/", function (request, response) {
  (async () => {
    try {
      const lyrics = await getAlbums();
      // await client.post("statuses/update", {
      //   status: "status test",
      // });
      fs.writeFileSync(
        __dirname + "/readiohead-albums-data.json",
        JSON.stringify(lyrics)
      );
    } catch (e) {
      console.log(e);
    } finally {
      response.sendFile(__dirname + "/readiohead-albums-data.json");
    }
  })();
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
