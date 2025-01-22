import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {AuthService} from '../../core/services/auth.service';
import {catchError, of} from 'rxjs';
import {hasRole} from '../../core/auth/jwt';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {UserService} from '../../core/services/user.service';

export const isAuthenticated = () => {
    const oidcSecurityService = inject(OidcSecurityService);
    const userService = inject(UserService);
    const router = inject(Router);

    return new Promise<boolean>((resolve) => {
        oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
            if (!isAuthenticated) {
                router.navigate(['/']);
                resolve(false);
            } else {
                oidcSecurityService.getAccessToken().subscribe((accessToken) => {
                    if (accessToken && userService.hasRole(accessToken, 'user')) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }
        });
    });
};
