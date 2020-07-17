const axios = require("axios");

const getLyrics = axios({
    "method":"GET",
    "url":"https://mourits-lyrics.p.rapidapi.com/",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"mourits-lyrics.p.rapidapi.com",
    "x-rapidapi-key":"4ac642092cmsh6cd5747081ba1aap18d48fjsn8df668db1d93",
    "useQueryString":true
    },"params":{
    "artist":"Radiohead",
    "song":"Karma Police"
    }
    })
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })

module.exports = getLyrics;