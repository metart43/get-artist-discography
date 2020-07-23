const axios = require("axios");
require("dotenv").config();

const getToken = async () => {
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
    return access_token;
  } catch (e) {
    const { status, statusText } = e.response
      ? e.response
      : { status: "400", statusText: "Unknown error" };
    return { [status]: statusText };
  }
};

module.exports = getToken;
