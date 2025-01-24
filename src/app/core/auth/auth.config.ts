import {LogLevel, PassedInitialConfig} from 'angular-auth-oidc-client';
import {environment} from '../../enviroments/environment';
/*
const redirectUrl = environment.production
  ? `${environment.appUrl}/blog-overview`
  : `${window.location.origin}/blog-overview`;

const postLogoutRedirectUri = environment.production
  ? `${environment.appUrl}/blog-overview`
  : `${window.location.origin}/blog-overview`;

const silentRenewUrl = environment
  ? `${environment.appUrl}/silent-renew.html`
  : `${window.location.origin}/silent-renew.html`;
*/
export const authConfig: PassedInitialConfig = {
  config: {
    authority: `${environment.authUrl}/realms/blog`,
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'spa-blog',
    scope: 'openid profile email offline_access blogs', // 'openid profile offline_access ' + your scopes
    responseType: 'code',
    silentRenew: true,
    silentRenewUrl: window.location.origin + '/silent-renew.html',
    renewTimeBeforeTokenExpiresInSeconds: 30,
    logLevel: LogLevel.Debug,
    secureRoutes: [environment.backendUrl],
  }
}
