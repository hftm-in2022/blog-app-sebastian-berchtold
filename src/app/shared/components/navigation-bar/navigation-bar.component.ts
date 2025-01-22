import {Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {UserService} from '../../../core/services/user.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    MatAnchor,
    MatButton,
    MatIcon,
    MatMenu,
    MatToolbar,
    MatMenuTrigger,
    MatIconButton
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  authenticated = signal<boolean>(false);
  userName = signal<string>('');
  canAddBlogs = signal<boolean>(false);
  isMobile = false;

  private oidcSecurityService = inject(OidcSecurityService);
  private userService = inject(UserService);
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.oidcSecurityService.checkAuth().subscribe((res) => {
      this.authenticated.set(res.isAuthenticated);

      if (res.isAuthenticated) {
        this.userName.set(res.userData.email);
        this.oidcSecurityService.getAccessToken().subscribe((accessToken) => {
          this.canAddBlogs.set(this.userService.hasRole(accessToken, 'user'));
        });
      }
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe();
  }


  onToggleSidenav() {
    this.toggleSidenav.emit(); // Emit the toggle event
  }
}
