import dotenv from "dotenv";
import express from "express";
import { Session } from "@inrupt/solid-client-authn-node";
import { toKebabCase } from "./util/converter"

dotenv.config()

const app = express();
const port: string | undefined = process.env.SERVER_PORT;
const appName: string = process.env.APP_NAME || 'SolidSpotify'
const clientId: string | undefined = process.env.CLIENT_ID
const clientSecret: string | undefined = process.env.CLIENT_SECRET
const refreshToken: string | undefined = process.env.REFRESH_TOKEN
const oidcIssuer: string | undefined = process.env.OIDC_ISSUER
const resourceUrl: string = `${oidcIssuer}${toKebabCase(appName)}/tracks.ttl`

const session: Session = new Session();
session.login({
  clientId: clientId,
  clientSecret: clientSecret,
  refreshToken: refreshToken,
  oidcIssuer: oidcIssuer,
}).then(() => {
  if (session.info.isLoggedIn) {
    session
      .fetch(resourceUrl)
      .then((response: any) => {
        return response.text();
      })
      .then(console.log);
  }
});
