import { Injectable } from '@angular/core';

import { ApiService } from '../shared';

@Injectable()
export class AuthService {
  // store the URL so we can redirect after logging in
  public redirectUrl: string;

  constructor(private api: ApiService) { }

  login(email: string, password: string) {
    return this.api.call('doctors/login', 'post', { email: email, password: password })
      .then((res) => {
        let response = res.json() || {};
        localStorage.setItem('token', response.id);
        localStorage.setItem('userId', response.userId);
      })
      .catch(function (error: any) {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        alert('Impossible de vous identifier, vérifier la console pour plus d\informations');
        return Promise.reject(error.message || error);
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  getUserId(): number {
    return localStorage.getItem('userId');
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    return !!token;
  }
}

export const AUTH_SERVICE_PROVIDERS = [AuthService, ApiService];
