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
  alert;

  constructor(private api: ApiService, public authService: AuthService, private router: Router) { }

  ngOnInit() {
    let userId = this.authService.getUserId();
    this.api.call('doctors/' + userId).then((res) => {
      this.profile = res.json() || {};
      this.profile.birthdate = this.formatDate(this.profile.birthdate);
    });
  }

  onSubmit() {
    this.api.call('doctors/' + this.profile.id, 'put', this.profile)
      .then((res) => { // RETURN 401 UNAUTHORIZED
        this.alert = {
          class: 'success',
          message: 'Votre profil a bien été sauvegardé'
        };
      })
      .catch((err) => {
        let alertMessage = `Une erreur s'est produite: ` + err.statusText;
        if (err._body) {
          try {
            let tmpBody = JSON.parse(err._body);
            if (tmpBody && tmpBody.error && tmpBody.error.message) {
              alertMessage = tmpBody.error.message;
            }
          } catch (e) { }
        }
        this.alert = {
          class: 'error',
          message: alertMessage
        };
        console.log(err);
      });
  }

  formatDate(date: string): string {
    if (!date) {
      return null
    }

    let dateObj = new Date(date);
    let month = '' + (dateObj.getMonth() + 1);
    let day = '' + dateObj.getDate();
    let year = dateObj.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}