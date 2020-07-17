const axios = require("axios");

const getSongs = async () => {
  let songs;
  try {
    const response = await axios({
      method: "GET",
      url: `http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=radiohead&api_key=${process.env.LAST_FM_API_KEY}&format=json`,
    });
    console.log(response);
  } catch (e) {}
};

const getLyrics = async () => {
  let lyrics;
  try {
    console.log("here");
    const response = await axios({
      method: "GET",
      url: "https://mourits-lyrics.p.rapidapi.com/",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "mourits-lyrics.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        useQueryString: true,
      },
      params: {
        artist: "Radiohead",
        song: "Karma Police",
      },
    });
    const { success, result } = response.data;
    lyrics = success ? result.lyrics : null;
    console.log(response);
    return lyrics;
  } catch (e) {
    console.log(e);
    return (lyrics = null);
  }
};
module.exports = getSongs;
