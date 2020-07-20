const express = require("express");
const app = express();
const Twitter = require("twitter-lite");
const getAlbums = require("./getSongs");

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

app.use(express.static("public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");

  (async () => {
    try {
      const lyrics = await getAlbums();
      // await client.post("statuses/update", {
      //   status: "status test",
      // });
    } catch (e) {
      console.log(e);
    }
  })();
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
