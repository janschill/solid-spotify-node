import { Session } from "@inrupt/solid-client-authn-node";

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

  constructor(config: SolidClientConfig) {
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
    this.refreshToken = config.refreshToken
    this.oidcIssuer = config.oidcIssuer
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
        .then((response: any) => {
          return response.text();
        });
    }
  }
}
