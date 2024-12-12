import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideHttpClient()]
};

const isBrowser = typeof window !== 'undefined';

export const oidcConfig = {
  authority: 'http://localhost:8080/auth/realms/blogs',
  clientId: 'blog',
  redirectUrl: isBrowser ? window.location.origin : 'http://localhost:4200',
  postLogoutRedirectUri: isBrowser ? window.location.origin : 'http://localhost:4200',
  responseType: 'code',
  scope: 'openid profile email roles',
  silentRenew: true,
  useRefreshToken: true,
};
