import dotenv from "dotenv";
import express from "express";
import { SolidClient } from "./client";
import { toKebabCase } from "./util/converter"
import { Session } from "@inrupt/solid-client-authn-node"

dotenv.config()

const app = express();
const port: string = process.env.SERVER_PORT || '3333'
const appName: string = process.env.APP_NAME || 'SolidSpotify'
const clientId: string = process.env.CLIENT_ID || 'example-id'
const clientSecret: string = process.env.CLIENT_SECRET || 'example-secret'
const refreshToken: string = process.env.REFRESH_TOKEN || 'example-token'
const oidcIssuer: string = process.env.OIDC_ISSUER || 'https://broker.pod.inrupt.com'
const privateResourceUrl: string = `https://pod.inrupt.com/jan/${toKebabCase(appName)}/tracks.ttl`
const publicResourceUrl: string = `https://pod.inrupt.com/jan/public/`

async function main() {
  const solidClient = new SolidClient({
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    oidcIssuer: oidcIssuer
  });

  await solidClient.login();

  if (solidClient.session) {
    const responsePrivate = await solidClient.fetch(privateResourceUrl);
    console.log(responsePrivate)
  }
}

main()
