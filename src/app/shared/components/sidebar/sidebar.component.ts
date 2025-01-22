import {Component, signal} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {UserService} from '../../../features/services/user.service';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        MatSidenavContainer,
        MatSidenavContent,
        MatNavList,
        MatSidenav,
        MatToolbar,
        MatIcon,
        RouterOutlet,
        MatIconButton,
        MatListItem,
        RouterLink,
        MatMenuTrigger,
        MatMenu
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    authenticated = signal<boolean>(false);
    userName = signal<string>('');
    canAddBlogs = signal<boolean>(false);

    constructor(private oidcSecurityService: OidcSecurityService,
                private userService: UserService) {
        this.oidcSecurityService.checkAuth().subscribe((res) => {
            this.authenticated.set(res.isAuthenticated);

            if (res.isAuthenticated) {
                this.userName.set(res.userData.email);
                this.oidcSecurityService.getAccessToken().subscribe((accessToken) => {
                    this.canAddBlogs.set(this.userService.hasRole(accessToken, 'user'));
                });
            }
        });
    }

    login() {
        this.oidcSecurityService.authorize();
    }

    logout() {
        this.oidcSecurityService.logoff().subscribe();
    }
}
