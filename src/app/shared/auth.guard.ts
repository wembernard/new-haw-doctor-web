import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService, AUTH_SERVICE_PROVIDERS } from '../shared';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // store the attempted URL for redirecting
    this.authService.redirectUrl = state.url;

    // navigate to the login page
    this.router.navigate(['/login']);

    return false;
  }
}

export const AUTH_GUARD_PROVIDERS = [AuthGuard, AUTH_SERVICE_PROVIDERS];
