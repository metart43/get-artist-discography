const axios = require("axios");
require("dotenv").config();

const getToken = async () => {
  console.log("client\n\n\n\n\n", process.env.SPOTIFY_CLIENT_ID);
  const encodedSecret = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
  ).toString("base64");
  try {
    const response = await axios({
      url: `https://accounts.spotify.com/api/token`,
      method: "POST",
      params: {
        grant_type: "client_credentials",
      },
      headers: {
        Authorization: `Basic ${encodedSecret}`,
      },
    });
    const { access_token } = response.data;
    process.env["SPOTIFY_TOKEN"] = access_token;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = getToken;
