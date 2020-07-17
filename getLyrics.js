const axios = require("axios");

const getSongs = async () => {
  let songs;
  try {
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
        "x-rapidapi-key": "4ac642092cmsh6cd5747081ba1aap18d48fjsn8df668db1d93",
        useQueryString: true,
      },
      params: {
        artist: "Radiohead",
        song: "2+2=5",
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
module.exports = getLyrics;
