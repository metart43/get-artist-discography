const axios = require("axios");
const fs = require("fs");

const getToken = async () => {
  try {
    const response = await axios({
      url: `https://accounts.spotify.com/api/token`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BASIC ${process.env.SPOTIFY_CLIENT_ID}`,
      },
    });
    console.log(response);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const matchSongs = async (id) => {
  try {
    const response = await axios({
      url: `https://api.spotify.com/v1/albums/${id}/tracks`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Grant-type": "client_credentials",
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
      },
    });
    const { items } = response.data;
    const names = items.map((song) => song.name);
    return names;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getAlbums = async () => {
  try {
    const token = await getToken();
    return null;
    // const response = await axios({
    //   url:
    //     "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb/albums?limit=40",
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
    //   },
    // });
    // const { items } = response.data;
    // const radioheadAlbums = await Promise.all(
    //   items.map(async (album) => ({
    //     [album.name]: {
    //       id: album.id,
    //       songs: await matchSongs(album.id),
    //     },
    //   }))
    // );
    // return radioheadAlbums;
  } catch (e) {
    console.log(e);
  }
};

module.exports = getAlbums;
