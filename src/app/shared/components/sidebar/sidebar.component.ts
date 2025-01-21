import {Component, inject, Input} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Observable, shareReplay} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {isAuthenticated} from '../../guards/is-authenticated.guard';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatTooltip} from '@angular/material/tooltip';
import {AuthService} from '../../../features/services/auth.service';
import {MatFormField} from '@angular/material/form-field';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatButtonModule, RouterModule, AsyncPipe, MatIcon, MatMenuTrigger, MatTooltip, MatMenu, MatFormField, MatToolbar],
  templateUrl: 'sidebar.component.html',
  styleUrl: 'sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() onClose!: () => void;

  onLogin() {
    console.log('Login button clicked');
    alert('Login functionality is not implemented yet.');
  }
  @Input() onMenuToggle!: () => void;
  authService = inject(AuthService);
  private readonly oidcSecurityService = inject(OidcSecurityService);
  protected readonly authenticated = this.oidcSecurityService.authenticated;

  isMobile$: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
    console.log(this.authenticated);
  }

  login(): void {
    this.oidcSecurityService.authorize();
    console.log('authorized')
  }

  logout(): void {
    this.oidcSecurityService.logoffLocal();
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

  protected readonly isAuthenticated = isAuthenticated;
}
