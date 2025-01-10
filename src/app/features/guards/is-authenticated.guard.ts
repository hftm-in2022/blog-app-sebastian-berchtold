import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';
import { CustomUserData } from '../../model/custom-user-data.interface'

export const isAuthenticatedGuard: CanActivateFn = async () => {
  const oidcService = inject(OidcSecurityService);

  const authResult = await firstValueFrom(oidcService.isAuthenticated$);
  const isAuthenticated = authResult.isAuthenticated;

  const userData = await firstValueFrom(oidcService.userData$) as CustomUserData;

  const userRoles = userData?.realm_access?.roles || [];

  return isAuthenticated && hasRole(userRoles, 'user');
};

export function hasRole(roles: string[], requiredRole: string): boolean {
  return roles.includes(requiredRole);
}
