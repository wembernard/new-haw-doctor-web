import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../shared';

@Component({
  selector: 'login',
  template: require('./login.component.html'),
  styles: [String(require('./login.component.scss'))],
  providers: [ApiService]
})

export class LoginComponent {
  model = {
    email: '',
    password: ''
  };

  constructor(private api: ApiService, private router: Router) { }

  onSubmit() {
    this.api.call('doctors/login', 'post', this.model)
      .then((res) => {
        let response = res.json() || {};
        console.log(response);
        localStorage.setItem('token', response.id);
        this.router.navigate(['/dashboard']);
      })
      .catch(function (error: any) {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        alert('Impossible de vous identifier, vérifier la console pour plus d\informations');
        return Promise.reject(error.message || error);
      });

  }
}
