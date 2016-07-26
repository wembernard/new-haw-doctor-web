import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  selector: 'haw-doctor-app',
  template: require('./app.component.html'),
  styles: [String(require('./app.component.scss'))],
  directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
  constructor(private router: Router) { }
}
