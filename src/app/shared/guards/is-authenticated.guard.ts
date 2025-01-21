import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {map, take} from 'rxjs/operators';

export const isAuthenticated = () => {
  const oidcSecurityService = inject(OidcSecurityService);
  const router = inject(Router);

  return oidcSecurityService.isAuthenticated$.pipe(
    take(1),
    map(({isAuthenticated}) => {
      if (isAuthenticated) {
        return true;
      }

      return router.parseUrl('/unauthorized');
    })
  );
};
