import SpotifyWebApi from 'spotify-web-api-node'

interface SpotifyClientConfig {
  clientId: string
  clientSecret: string
}

export class SpotifyClient {
  session: SpotifyWebApi
  clientId: string
  clientSecret: string
  scope: string[]

  constructor(config?: SpotifyClientConfig) {
    this.clientId = config && config.clientId || configuration.spotifyClientId
    this.clientSecret = config && config.clientSecret || configuration.spotifyClientSecret
    this.redirectUri = config && config.redirectUri || configuration.spotifyRedirectUri
    this.scope = ['user-library-read',
      'user-read-currently-playing',
      'streaming',
      'user-read-playback-state',
      'user-read-recently-played']
    this.session = new SpotifyWebApi({
      clientId: this.clientId,
      clientSecret: this.clientSecret
    })
  }

  async login() {
    const url = await this.session.createAuthorizeURL(this.scope, 'state')
    console.log(url)
    const data = await this.session.clientCredentialsGrant();
    this.session.setAccessToken(data.body['access_token'])
    return data

    // _this.session.clientCredentialsGrant().then(data => {
    //   // console.log(data.body['access_token'])
    //   _this.session.setAccessToken(data.body['access_token']);
    //   console.log('then', _this.session.getAccessToken())
    // }, error => {
    //   console.log('Error retrieving an access token', error.message);
    // });

    // console.log('accesstoken', await _this.session.getAccessToken())
    // this.session.setAccessToken(this.bearerToken);
  }

  async fetch() {
    console.log('fetch', this.session.getAccessToken())
    this.session.getMyTopArtists()
      .then(function (data: any) {
        const topArtists = data.body.items;
        return topArtists;
      }, function (err: any) {
        console.log(JSON.stringify(err));
      });
  }
}





