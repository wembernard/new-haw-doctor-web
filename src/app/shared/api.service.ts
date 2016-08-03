import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
declare var process: any;

@Injectable()
export class ApiService {
  url: string;
  requestOptions: RequestOptions;

  constructor(private http: Http) {
    // this.url = 'http://api.demo.haw.k4met.com/api/';
    this.url = 'http://api.dev.haw.k4met.com/api/';
    //  this.url = 'http://192.168.10.135:3000/api/';
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    this.requestOptions = new RequestOptions({ headers: headers });
  };

  call(resource: string, verb: string = 'get', body?: Object) {
    this.prepareHeaders();

    if (process.env.NODE_ENV !== 'production') {
      console.log('%c[' + verb.toUpperCase() + ']' + '%c ' + resource + '%c with body', 'color: red', 'color: blue', 'color: grey', body);
    }

    if (['post', 'put', 'patch'].indexOf(verb) >= 0) {
      return this.http[verb](this.url + resource, body, this.requestOptions).toPromise();
    } else {
      return this.http[verb](this.url + resource, this.requestOptions).toPromise();
    }
  };

  private prepareHeaders() {
    this.requestOptions.headers.delete('Authorization');
    this.requestOptions.headers.append('Authorization', localStorage.getItem('token'));
  }
}
