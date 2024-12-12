import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from 'angular-auth-oidc-client';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './services/error-handler.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:8080/auth/realms/blogs',
        clientId: 'blog',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        responseType: 'code',
        scope: 'openid profile email roles',
        silentRenew: true,
        useRefreshToken: true,
      }
    }),
    RouterModule.forRoot([{ path: "", component: AppComponent }])

  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(withFetch()),

  ],
})
export class AppModule {
}