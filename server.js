const express = require("express");
const app = express();
const getAlbums = require("./getSongs");
const getToken = require("./getToken");
const fs = require("fs");

app.use(express.static("public"));

app.get("/", function (request, response) {
  (async () => {
    try {
      await getToken();
      const lyrics = await getAlbums();
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
