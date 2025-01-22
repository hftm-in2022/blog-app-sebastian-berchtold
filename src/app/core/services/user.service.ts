import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  hasRole(accessToken: string, role: string) {
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    const roles: string[] = decodedToken?.realm_access?.roles || [];
    return roles.includes(role);
  }
}
