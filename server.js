const express = require("express");
const app = express();
const getAlbums = require("./getSongs");
const getToken = require("./getToken");
const dotenv = require("dotenv");

dotenv.config();

app.get("/", function (request, response) {
  let lyrics;
  (async () => {
    try {
      await getToken();
      lyrics = await getAlbums();
    } catch (e) {
      const { status, statusText } = e.response
        ? e.response
        : { status: "400", statusText: "Unknown error" };
      lyrics = { [status]: statusText };
    } finally {
      response.send(JSON.stringify(lyrics));
    }
  })();
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
