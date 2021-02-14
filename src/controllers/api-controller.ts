import { config } from '../configuration';
import { SpotifyClient } from '../spotify-client';

class ApiController {
  default() {
    return {
      text: `You've reached the ${this.constructor.name} default method`
    };
  }

  async recentTracks() {
    const oauthToken = config.spotifyAccessToken
    const spotifyClient = new SpotifyClient();
    spotifyClient.session.setAccessToken(oauthToken);
    const response = await spotifyClient.fetch();
    console.log('ApiController', response);

    return response;
  }
}

export =  new ApiController();
