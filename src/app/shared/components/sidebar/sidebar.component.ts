import {Component, signal} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {UserService} from '../../../core/services/user.service';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        MatToolbar,
        MatAnchor,
        MatButton,
        MatMenuTrigger,
        MatMenu
        ,
        MatIcon
    ],
    templateUrl: 'sidebar.component.html',
    styleUrl: 'sidebar.component.scss'
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
