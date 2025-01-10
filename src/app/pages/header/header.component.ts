import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
})
export class HeaderComponent {
  isAuthenticated = false;

  constructor(private oidcService: OidcSecurityService) {
    this.oidcService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  toggleAuth(): void {
    if (this.isAuthenticated) {
      this.logout();
    } else {
      this.login();
    }
  }

  login(): void {
    this.oidcService.authorize();
  }

  logout(): void {
    this.oidcService.logoff().subscribe({
      next: () => console.log('Logged out successfully'),
      error: (err) => console.error('Error during logout:', err),
    });
  }
}
