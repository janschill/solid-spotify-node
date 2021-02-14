import { NextFunction, Request, Response, Router } from 'express';
import { config } from '../configuration';
import SpotifyWebApi from 'spotify-web-api-node';

class IndexRouter {
  private _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {

      const scopes = ['user-read-private', 'user-read-email'],
        redirectUri = config.spotifyRedirectUri,
        clientId = config.spotifyClientId,
        state = 'some-state-of-my-choice';

      const spotifyApi = new SpotifyWebApi({
        redirectUri: redirectUri,
        clientId: clientId
      });

      const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

      res.render('index', { appName: config.appName, authorizeURL: authorizeURL })
    });

    this._router.get('/login', (req: Request, res: Response, next: NextFunction) => {
      const spotifyApi = new SpotifyWebApi({
        clientId: config.spotifyClientId,
        clientSecret: config.spotifyClientSecret,
        redirectUri: config.spotifyRedirectUri
      });
    });

    this._router.get('/callback', function (req, res) {

      var code: any = req.query.code; // Read the authorization code from the query parameters

      const spotifyApi = new SpotifyWebApi()

      spotifyApi.authorizationCodeGrant(code)
        .then(function (data: any) {
          console.log('The token expires in ' + data['expires_in']);
          console.log('The access token is ' + data['access_token']);
          console.log('The refresh token is ' + data['refresh_token']);
          spotifyApi.setAccessToken(data.body['access_token']);
          spotifyApi.setRefreshToken(data.body['refresh_token']);
          /* Ok. We've got the access token!
             Save the access token for this user somewhere so that you can use it again.
             Cookie? Local storage?
          */

          res.redirect('/');

        }, function (err) {
          res.status(err.code);
          res.send(err.message);
        })
    });

  }
}

export = new IndexRouter().router;
