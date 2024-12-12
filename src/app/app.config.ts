import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideHttpClient()]
};

export const oidcConfig = {
  authority: 'https://<your-keycloak-url>/realms/<your-realm>',
  clientId: '<your-client-id>',
  redirectUrl: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  responseType: 'code',
  scope: 'openid profile roles',
  silentRenew: true,
  useRefreshToken: true,
};