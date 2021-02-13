import dotenv from "dotenv";

dotenv.config()

export const config = {
  port: process.env.SERVER_PORT || '3333',
  appName: process.env.APP_NAME || 'SolidSpotify',
  solidClientId: process.env.SOLID_CLIENT_ID || 'SOLID_CLIENT_ID',
  solidClientSecret: process.env.SOLID_CLIENT_SECRET || 'SOLID_CLIENT_SECRET',
  solidRefreshToken: process.env.SOLID_REFRESH_TOKEN || 'SOLID_REFRESH_TOKEN',
  solidOidcIssuer: process.env.SOLID_OIDC_ISSUER || 'https://broker.pod.inrupt.com',
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID || 'SPOTIFY_CLIENT_ID',
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'SPOTIFY_CLIENT_SECRET',
  spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI || 'SPOTIFY_REDIRECT_URI'
}
