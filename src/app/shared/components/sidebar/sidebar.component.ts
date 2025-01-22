import {Component, inject, signal, ViewChild} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {UserService} from '../../../core/services/user.service';
import {MatIcon} from '@angular/material/icon';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {RouterOutlet} from '@angular/router';
import {MatAnchor, MatButton} from '@angular/material/button';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIcon,
    NavigationBarComponent,
    MatSidenavContainer,
    MatSidenav,
    RouterOutlet,
    MatSidenavContent,
    MatAnchor,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatToolbar
  ],
  templateUrl: 'sidebar.component.html',
  styleUrl: 'sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  authenticated = signal<boolean>(false);
  userName = signal<string>('');
  canAddBlogs = signal<boolean>(false);
  isMobile = false;
  events: string[] = [];
  opened = false;
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

  toggleSidenav() {
    this.sidenav.toggle(); // Toggle the sidenav open/close
  }
}
