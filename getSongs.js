const axios = require("axios");

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
    const { items } = response.data;
    const names = items.map((song) => song.name);
    return names;
  } catch (e) {
    const { status, statusText } = e.response;
    return { [status]: statusText };
  }
};

const getAlbums = async () => {
  try {
    const response = await axios({
      url:
        "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb/albums?limit=40",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
      },
    });
    const { items } = response.data;
    const radioheadAlbums = await Promise.all(
      items.map(async (album, i) => ({
        [album.name]: {
          id: `${i}`,
          spotifyId: album.id,
          songs: await matchSongs(album.id),
        },
      }))
    );
    return radioheadAlbums;
  } catch (e) {
    const { status, statusText } = e.response;
    return { [status]: statusText };
  }
};

module.exports = getAlbums;
