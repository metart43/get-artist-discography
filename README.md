<b>get-artist-discography</b>
</br>
NPM package built to get simplified response with full discography for the requested artist. Information is fetched from Spotify API.
</br>
<b>Usage</b>
</br>
<code>npm i radiohead-discography</code>
</br>
<code>const getDiscography = require("radiohead-discography/getDiscography");</code>
</br>
or
</br>
<code>import getDiscography from "radiohead-discography/getDiscography";</code>
</br>
You also will need to <a href="https://developer.spotify.com/dashboard/">sign up</a> and get Client ID and Client Secret.
After you have both keys, add them to your <code>.env</code> file

```
process.env.SPOTIFY_CLIENT_ID=<your-key>
process.env.SPOTIFY_CLIENT_SECRET=<your-key>
```

<b>Response example:</b>
Type: <code>Array of Objects</code>

```
[
  {
    "OK Computer OKNOTOK 1997 2017": {
      "id": "0",
      "release_date": "2017-06-23",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b2730797b2dcca7a453c3374c599",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e020797b2dcca7a453c3374c599",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d000048510797b2dcca7a453c3374c599",
          "width": 64
        }
      ],
      "spotifyId": "4ENxWWkPImVwAle9cpJ12I",
      "songs": [
        "Airbag - Remastered",
        "Paranoid Android - Remastered",
        "Subterranean Homesick Alien - Remastered",
        "Exit Music (For a Film) - Remastered",
        "Let Down - Remastered",
        "Karma Police - Remastered",
        "Fitter Happier - Remastered",
        "Electioneering - Remastered",
        "Climbing Up the Walls - Remastered",
        "No Surprises - Remastered",
        "Lucky - Remastered",
        "The Tourist - Remastered",
        "I Promise",
        "Man of War",
        "Lift",
        "Lull - Remastered",
        "Meeting in the Aisle - Remastered",
        "Melatonin - Remastered",
        "A Reminder - Remastered",
        "Polyethylene (Parts 1 & 2) - Remastered"
      ]
    }
  }
]
```

\ ゜ o ゜)ノ
