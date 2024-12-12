import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthModule } from 'angular-auth-oidc-client';
import { oidcConfig } from './app/app.config';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      AuthModule.forRoot({
        config: oidcConfig,
      })
    ),
  ],
}).catch((err) => console.error(err));

