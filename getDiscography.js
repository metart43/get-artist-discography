const axios = require("axios");
const getToken = require("./getToken");

const matchSongs = async (id, token) => {
  try {
    const response = await axios({
      url: `https://api.spotify.com/v1/albums/${id}/tracks`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { items } = response.data;
    const names = items.map((song) => song.name);
    return names;
  } catch (e) {
    const { status, statusText } = e.response
      ? e.response
      : { status: "400", statusText: "Unknown error" };
    return { [status]: statusText };
  }
};

const getDiscography = async (id, limit = 20) => {
  try {
    const token = await getToken();
    const response = await axios({
      url: `https://api.spotify.com/v1/artists/${id}/albums?limit=${limit}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { items } = response.data;
    const radioheadAlbums = await Promise.all(
      items.map(async ({ name, release_date, images, id }, i) => ({
        [name]: {
          id: `${i}`,
          release_date,
          images,
          spotifyId: id,
          songs: await matchSongs(id, token),
        },
      }))
    );
    return radioheadAlbums;
  } catch (e) {
    const { status, statusText } = e.response
      ? e.response
      : { status: "400", statusText: "Unknown error" };
    return { [status]: statusText };
  }
};

module.exports = getDiscography;
