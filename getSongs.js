const axios = require("axios");
const fs = require("fs");

const getSongs = async () => {
  try {
    console.log("fetch albums");
    const response = await axios({
      url:
        "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb/albums?limit=2",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer BQC3OcWrVc70k_TXlNCT6saF2aN3mQP2aDnOF3pTXwQGDA68qz9baeXFpUAXXeu7O696wxy0BH98FGSxDntrEtF1e4b9Zx-RbuJrbW5k8sksXaZgQ4kl36WL5fo3pYAQ54KGujxPqRCtceCRx8u_bdRB5sCF-gtNIy2nDnDLAS3Q4mhnhl-c-n4MuhbSfT1HZy5VatE3P5alh-RVCaSONS5sJQDf8tZPsvc7mwPp4tadnazPvWHOUXBeKW1rLOp44tfT0RMHudeL",
      },
    });
    const { items } = response.data;
    const radioheadAlbums = Object.fromEntries(
      new Map(
        items.map((album) => [
          album.name,
          {
            id: album.id,
            songs: [],
          },
        ])
      )
    );

    console.log(radioheadAlbums);
    const discography = Object.values(radioheadAlbums).map(({ id, songs }) =>
      (async () => {
        try {
          const fetchedSongs = await axios({
            url: `https://api.spotify.com/v1/albums/${id}/tracks`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer BQC3OcWrVc70k_TXlNCT6saF2aN3mQP2aDnOF3pTXwQGDA68qz9baeXFpUAXXeu7O696wxy0BH98FGSxDntrEtF1e4b9Zx-RbuJrbW5k8sksXaZgQ4kl36WL5fo3pYAQ54KGujxPqRCtceCRx8u_bdRB5sCF-gtNIy2nDnDLAS3Q4mhnhl-c-n4MuhbSfT1HZy5VatE3P5alh-RVCaSONS5sJQDf8tZPsvc7mwPp4tadnazPvWHOUXBeKW1rLOp44tfT0RMHudeL",
            },
          });
          const { items } = fetchedSongs.data;
          items.forEach((song) => songs.push(song.name));
        } catch (e) {
          console.log(e);
        }
      })()
    );
    console.log(discography);
    return discography;
    // return radioheadAlbums;
  } catch (e) {
    console.log(e);
  }
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
