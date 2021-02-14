import { Session } from "@inrupt/solid-client-authn-node";
import { config } from "./configuration";
import {
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getUrlAll
} from "@inrupt/solid-client";
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";

interface SolidClientConfig {
  clientId: string
  clientSecret: string
  refreshToken: string
  oidcIssuer: string
}

export class SolidClient {
  session: Session
  clientId: string
  clientSecret: string
  refreshToken: string
  oidcIssuer: string

  constructor(conf?: SolidClientConfig) {
    this.clientId = conf && conf.clientId || config.solidClientId
    this.clientSecret = conf && conf.clientSecret || config.solidClientSecret
    this.refreshToken = conf && conf.refreshToken || config.solidRefreshToken
    this.oidcIssuer = conf && conf.oidcIssuer || config.solidOidcIssuer
    this.session = new Session()
  }

  async login(): Promise<any> {
    return this.session.login({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      refreshToken: this.refreshToken,
      oidcIssuer: this.oidcIssuer,
    });
  }

  async fetch(url: string): Promise<any> {
    if (this.session.info.isLoggedIn) {
      return this.session
        .fetch(url)
        .then((response: any) => response.text());
    }
  }

  async clientFetch(): Promise<any> {
    const resourceUrl = "https://pod.inrupt.com/jan/solid-spotify/tracks.ttl"
    const dataset = await getSolidDataset(
      resourceUrl, {
      fetch: this.session.fetch
    });
    const resource = getThingAll(dataset);

    console.log(resource)
  }
}
