import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideAuth} from 'angular-auth-oidc-client';
import { authConfig } from './app/auth/auth.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync(),
    provideAuth(authConfig),
  ],
}).catch((err) => console.error(err));
