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
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
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
    Object.values(radioheadAlbums).map(({ id, songs }) => {
      axios({
        url: `https://api.spotify.com/v1/albums/${id}/tracks`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
        },
      }).then((res) => {
        const { items } = res.data;
        items.forEach((song) => {songs.push(song));
      });
    });
    console.log(radioheadAlbums);
    // return discography;
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
