const express = require("express");
const app = express();
const Twitter = require("twitter-lite")

const client = new Twitter({
  consumer_key: "xyz",
  consumer_secret: "xyz",
  access_token_key: "xyz",
  access_token_secret: "xyz"
});


app.use(express.static("public"));


app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});


const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
