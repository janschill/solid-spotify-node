const dotenv = require('dotenv');
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const BEARER_TOKEN = process.env.BEARER_TOKEN

const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: 'http://www.example.com/callback'
});

spotifyApi.setAccessToken(BEARER_TOKEN);

spotifyApi.getMyTopArtists()
  .then(function (data) {
    let topArtists = data.body.items;
    console.log(topArtists);
  }, function (err) {
    console.log('Something went wrong!', err);
  });
