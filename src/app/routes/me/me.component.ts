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
      // this.profile.birthdate = this.formatDate(this.profile.birthdate);
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
        this.alert = {
          class: 'error',
          message: `Une erreur s'est produite: ` + err.statusText
        };
        console.log(err);
      });
  }
}