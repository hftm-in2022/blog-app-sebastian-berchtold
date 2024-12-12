import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

export const isAuthenticatedGuard: CanActivateFn = () => {
  const oidcService = inject(OidcSecurityService);
  const isAuthenticated = oidcService.isAuthenticated();
  const userRoles = oidcService.getUserData()?.roles || [];

  return isAuthenticated && hasRole(userRoles, 'user');
};

export function hasRole(roles: string[], requiredRole: string): boolean {
  return roles.includes(requiredRole);
}