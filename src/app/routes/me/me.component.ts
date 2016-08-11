import { Component, OnInit } from '@angular/core';

import { ApiService, AuthService } from '../../shared';

@Component({
  selector: 'me',
  template: require('./me.component.html'),
  styles: [String(require('./me.component.scss'))]

})

export class MeComponent implements OnInit {
  profile;
  // dateRegex;

  constructor(private api: ApiService, public authService: AuthService) { }

  ngOnInit() {
    // this.dateRegex='/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])';
    let userId = this.authService.getUserId();
    this.api.call('doctors/' + userId).then((res) => {
      this.profile = res.json() || {};
    });
  }

  onSubmit() {
     // for (let i in )
    this.api.call('doctors/', 'post', this.profile).then((res) => { // RETURN 401 UNAUTHORIZED
      console.log(res);
    });
  }
}
