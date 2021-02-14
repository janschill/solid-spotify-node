import { Session } from "@inrupt/solid-client-authn-node";
import { config } from "./configuration";

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
}
