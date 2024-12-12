
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideAuth } from 'angular-auth-oidc-client';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideHttpClient(),
  provideAuth({
    config: {
      authority: 'http://localhost:8080/auth/realms/blogs',
      clientId: 'blog',
      redirectUrl: 'http://localhost:4200/',
      postLogoutRedirectUri: 'http://localhost:4200/',
      responseType: 'code',
      scope: 'openid profile email roles',
      silentRenew: true,
      useRefreshToken: true,
    },
  }),
  ]
};

