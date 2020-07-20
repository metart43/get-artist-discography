const axios = require("axios");
const fs = require("fs");

const matchSongsWithAlbums = async (albums) => {
  let songs;
  Object.values(albums).map(({ id, songs }) => {
    axios({
      url: `https://api.spotify.com/v1/albums/${id}/tracks`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
      },
    }).then((res) => {
      const { items } = res.data;
      console.log("songs after then", items);
      songs = items;
    });
  });
  console.log(songs);

  // return matchedObject
};

const getAlbums = async () => {
  try {
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

    await Promise.all(
      Object.values(radioheadAlbums).map(({ id, songs }) => {
        const newArray
        axios({
          url: `https://api.spotify.com/v1/albums/${id}/tracks`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
          },
        }).then((res) => {
          const { items } = res.data;
          
          return items.forEach((song) => songs.push(song));
        });
      })
    );
    console.log(radioheadAlbums);
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
module.exports = getAlbums;
