
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { LogLevel, OpenIdConfiguration, provideAuth, StsConfigLoader, StsConfigStaticLoader } from 'angular-auth-oidc-client';
import { routes } from './app.routes';

const redirectUrl = typeof window !== 'undefined' ? window.location.origin : '';
const postLogoutRedirectUri = typeof window !== 'undefined' ? window.location.origin : '';

export const authConfig: OpenIdConfiguration = {
  authority: 'https://d-cap-keyclaok.kindbay-711f60b2.westeurope.azurecontainerapps.io/realms/blog',
  redirectUrl: redirectUrl,
  postLogoutRedirectUri: postLogoutRedirectUri,
  clientId: 'spa-blog',
  scope: 'profile email offline_access blogs',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  renewTimeBeforeTokenExpiresInSeconds: 30,
  logLevel: LogLevel.Debug,
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideClientHydration(),

    provideAnimationsAsync(),

    provideHttpClient(withFetch()),

    provideAuth({
      config: authConfig,
    }),

    {
      provide: StsConfigLoader,
      useFactory: () => new StsConfigStaticLoader(authConfig),
    },
  ],
};