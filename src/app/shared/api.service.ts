import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare var process: any;

@Injectable()
export class ApiService {
  url: string;
  requestOptions: RequestOptions;

  constructor(private http: Http, private router: Router) {
    // this.url = 'http://api.demo.haw.k4met.com/api/';
    // this.url = 'http://api.dev.temp.k4met.com/api/';
    this.url = 'http://api.demo.temp.k4met.com/api/';
    //  this.url = 'http://192.168.10.135:3000/api/';
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    this.requestOptions = new RequestOptions({ headers: headers });
  };

  call(resource: string, verb: string = 'get', body?: Object) {
    let promise;

    this.prepareHeaders();

    if (process.env.NODE_ENV !== 'production') {
      console.log('%c[' + verb.toUpperCase() + ']' + '%c ' + resource + '%c with body', 'color: red', 'color: blue', 'color: grey', body);
    }

    if (['post', 'put', 'patch'].indexOf(verb) >= 0) {
      promise = this.http[verb](this.url + resource, body, this.requestOptions).toPromise();
    } else {
      promise = this.http[verb](this.url + resource, this.requestOptions).toPromise();
    }

    return promise.catch(err => {
      /** Unauthorized */
      if (err.status === 401) {
        // store the current URL for redirecting back after login
        // this.authService.redirectUrl = this.router.url; // Cause dependency injection trouble 
        // navigate to the login page
        this.router.navigate(['/login']);
      }
    });
  };

  private prepareHeaders() {
    this.requestOptions.headers.delete('Authorization');
    this.requestOptions.headers.append('Authorization', localStorage.getItem('token'));
  }
}
