import express from "express";
import cors from "cors";
import path from "path"

import { SolidClient } from "./solid-client";
import { SpotifyClient } from "./spotify-client";

import { config } from "./configuration"
import { toKebabCase } from "./util/converter"
import BaseRouter from "./routers/base";


const privateResourceUrl = `https://pod.inrupt.com/jan/${toKebabCase(config.appName)}/tracks.ttl`
// const publicResourceUrl = `https://pod.inrupt.com/jan/public/`

async function solid() {

  const solidClient = new SolidClient();
  await solidClient.login();
  // const topArtists = await this.topArtists();
  await solidClient.clientFetch();
}
solid()

// async function spotify() {
//   const spotifyClient = new SpotifyClient({
//     clientId: config.spotifyClientId,
//     clientSecret: config.spotifyClientSecret,
//     redirectUri: config.spotifyRedirectUri
//   });

//   await spotifyClient.login();
//   const response = await spotifyClient.fetch();
//   console.log(response)
// }

// solid()
// spotify()


class Server {
  public app = express();
  public router = BaseRouter;
}

const server = new Server();

server.app.use("/", server.router);
// server.app.use(cors());
server.app.set("views", path.join(__dirname, "/views/"));
server.app.set("view engine", "ejs")

server.app.use(express.static("public"))

const port = config.port || 5000;

server.app.listen(port, () => {
  console.log(`Listening on port ${port}: http://localhost:${port}`);
});
