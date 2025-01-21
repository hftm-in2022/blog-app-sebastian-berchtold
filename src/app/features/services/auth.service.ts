import {inject, Injectable} from '@angular/core';
import {LoginResponse, OidcSecurityService} from 'angular-auth-oidc-client';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {Router} from '@angular/router';

export interface User {
  sub: string;
  email_verified: boolean;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

interface UserData {
  isAuthenticated: boolean;
  user: User;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oidcSecurityService = inject(OidcSecurityService);
  router = inject(Router);

  private loginResponse$ = new BehaviorSubject<LoginResponse>({
    isAuthenticated: false,
    userData: null, // use Null for default value
    accessToken: '',
    idToken: '',
    configId: '',
    errorMessage: '',
  });

  // Getter for LoginResponse
  getLoginResponse(): Observable<LoginResponse> {
    return this.loginResponse$.asObservable();
  }
  //Setter for LoginResponse
  setLoginResponse(loginResponse: LoginResponse) {
    this.loginResponse$.next(loginResponse);
  }
  getToken(): string | null {
    return this.loginResponse$.getValue().accessToken;
  }

  getUser(): User | null {
    return this.loginResponse$.getValue().userData;
  }

  getUserInitials(): string {
    const user = this.getUser();
    if (user) {
      const username = user.preferred_username;
      const localPart = username.split('@')[0];
      return localPart
        .split(/[._-]/)
        .map((token: string) => token.charAt(0))
        .join('');
    }
    return '';
  }

  // Method to trigger login
  login(): void {
    this.oidcSecurityService.authorize();
  }

  // Method to trigger logout
  logout() {
    this.oidcSecurityService.logoff().subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {
        console.error('Error during logout:', err);
      },
    });
  }

  handlePostLogin(): void {
    this.oidcSecurityService
      .checkAuth()
      .pipe(
        tap((response) => {
          this.setLoginResponse(response);
        }),
        catchError((error) => {
          console.error('Error during post-login handling:', error);
          return of(null);
        }),
      )
      .subscribe();
  }
}
