const axios = require("axios");
const fs = require("fs");

const matchSongs = async (id) => {
  try {
    const response = await axios({
      url: `https://api.spotify.com/v1/albums/${id}/tracks`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
      },
    });
    const { items } = response.data.items;
    console.log(items);
    return items;
  } catch (e) {
    console.log(e);
    return null;
  }
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
    const radioheadAlbums = await Promise.all(
      items.map(async (album) => ({
        [album.name]: {
          id: album.id,
          songs: await matchSongs(album.id),
        },
      }))
    );
    console.log();
    return radioheadAlbums;
  } catch (e) {
    console.log(e);
  }
};

module.exports = getAlbums;
