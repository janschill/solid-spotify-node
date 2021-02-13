import { config } from "./configuration"
import { toKebabCase } from "./util/converter"

import express from "express";
import { SolidClient } from "./solid-client";
import { SpotifyClient } from "./spotify-client";

const app = express();
const privateResourceUrl = `https://pod.inrupt.com/jan/${toKebabCase(config.appName)}/tracks.ttl`
const publicResourceUrl = `https://pod.inrupt.com/jan/public/`


async function solid() {
  const solidClient = new SolidClient({
    clientId: config.solidClientId,
    clientSecret: config.solidClientSecret,
    refreshToken: config.solidRefreshToken,
    oidcIssuer: config.solidOidcIssuer
  });

  await solidClient.login();

  if (solidClient.session) {
    const response = await solidClient.fetch(privateResourceUrl);
    console.log(response)
  }
}

async function spotify() {
  const spotifyClient = new SpotifyClient({
    clientId: config.spotifyClientId,
    clientSecret: config.spotifyClientSecret
  });

  await spotifyClient.login();
  const response = await spotifyClient.fetch();
  console.log(response)
}

// solid()
spotify()
