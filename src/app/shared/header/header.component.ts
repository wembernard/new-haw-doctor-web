import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { AuthService } from '../../shared';

@Component({
  selector: 'haw-header',
  template: require('./header.component.html'),
  styles: [String(require('./header.component.scss'))],
  directives: [ROUTER_DIRECTIVES]
})

export class HeaderComponent {
  isLoggedIn = this.authService.isLoggedIn;

  constructor(private router: Router, private authService: AuthService) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
