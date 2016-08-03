import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService, AuthService } from '../../shared';

@Component({
  selector: 'login',
  template: require('./login.component.html'),
  styles: [String(require('./login.component.scss'))]
})

export class LoginComponent {
  model = {
    email: '',
    password: ''
  };

  constructor(private api: ApiService, private router: Router, public authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.model.email, this.model.password).then(() => {
      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
      this.router.navigate([redirect]);
    });
  }
}
