import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, AuthService } from '../../shared';

@Component({
  selector: 'me',
  template: require('./me.component.html'),
  styles: [String(require('./me.component.scss'))]

})

export class MeComponent implements OnInit {
  profile;
  
  constructor(private api: ApiService, public authService: AuthService,private router: Router) { }

  formatDate(date) {
    if(!date) {return null}
      var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let formatedDate = [year, month, day].join('-');
    return formatedDate;
  }
  ngOnInit() {
    let userId = this.authService.getUserId();
    this.api.call('doctors/' + userId).then((res) => {
      this.profile = res.json() || {};
      this.profile.birthdate = this.formatDate(this.profile.birthdate);
    });
  }

  onSubmit() {
     // for (let i in )
    this.api.call('doctors/', 'post', this.profile).then((res) => { // RETURN 401 UNAUTHORIZED
      if(res) {
        this.router.navigate(['/dashboard']);
      } // Todo : catch the error by saying it didn't work
    })
  }
}