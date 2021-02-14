import { config } from "../configuration";
import { SolidClient } from "../solid-client";
import { SpotifyClient } from "../spotify-client";

class ApiController {
  default() {
    return {
      text: `You've reached the ${this.constructor.name} default method`
    };
  }

  async topArtists() {
    const oauthToken = config.spotifyAccessToken
    const spotifyClient = new SpotifyClient();
    spotifyClient.session.setAccessToken(oauthToken);
    const response = await spotifyClient.fetch();

    return response;
  }

  async saveToPod() {
    const solidClient = new SolidClient();
    await solidClient.login();
    const topArtists = await this.topArtists();
    await solidClient.clientFetch();

    // const response = await solidClient.fetch("https://pod.inrupt.com/jan/solid-spotify/tracks.ttl");
    // console.log(response)

    // return response;
  }
}

export =  new ApiController();
