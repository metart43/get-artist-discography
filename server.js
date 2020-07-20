const express = require("express");
const app = express();
const getAlbums = require("./getSongs");
const getToken = require("./getToken");
const fs = require("fs");
const dotenv = require("dotenv");

app.use(express.static("public"));
dotenv.config();

app.get("/", function (request, response) {
  let lyrics;
  let error;
  (async () => {
    try {
      await getToken();
      lyrics = await getAlbums();
    } catch (e) {
      console.log(e);
      error = e.response.data;
    } finally {
      lyrics
        ? response.send(JSON.stringify(lyrics))
        : response.send(JSON.stringify(JSON.stringify(error)));
    }
  })();
});

const listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
