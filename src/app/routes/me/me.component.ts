import { Component, OnInit } from '@angular/core';

import { ApiService, AuthService } from '../../shared';

@Component({
  selector: 'me',
  template: require('./me.component.html'),
  styles: [String(require('./me.component.scss'))]
})

export class MeComponent implements OnInit {
  profile;

  constructor(private api: ApiService, public authService: AuthService) { }

  ngOnInit() {
    let userId = this.authService.getUserId();
    this.api.call('doctors/' + userId).then((res) => {
      this.profile = res.json() || {};
    });
  }

  onSubmit() {
    // this.api.call('doctors/' + this.profile.id, 'put', this.profile).then((res) => { // RETURN 504 TIMEOUT
    this.api.call('doctors', 'put', this.profile).then((res) => { // RETURN 401 UNAUTHORIZED
      console.log(res);
    });
  }
}
