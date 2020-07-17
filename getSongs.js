const axios = require("axios");
const fs = require("fs");

const getSongs = async () => {
  try {
        console.log("fetch albums");
        const response = await axios({
          url:
            "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb/albums?limit=35",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer BQDSGr7WYv-6J7hKVhLWll4SsQKqmAitbmpMLd-YHg09UPUNwr3vpdCjR-WpPGZ_j2-_kEyrBbASMAKQG1V0gZf-R8IEzXJMV00ROh3tMtHZapXUT04FXiNI_hFlM-EKWkfWlWCz5J50K26PvneUQBY6uVZ6PzesAWuFoyKCqsl5WNXwkwHRGX4k7bgayUFMkUe1lKsjLiNSRRXZLivFS5ku-zAzn5f5IZMNqAU-yHLJPntCWFJRhqACr645B-HrJRwu8sGnP22E",
          },
        });
        const { items } = response.data;
        // const radioheadAlbums = JSON.stringify(
        //   Object.fromEntries(
        //     new Map(items.map((album) => [album.name, { id: album.id, songs: [] }]))
        //   )
        // );
        const radioheadAlbums = JSON.stringify(
         
            items.map((album) => [album.name, { id: album.id, songs: [] }]))
          
        );
        radioheadAlbums.map();
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
