import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  selector: 'haw-header',
  template: require('./header.component.html'),
  styles: [String(require('./header.component.scss'))],
  directives: [ROUTER_DIRECTIVES]
})

export class HeaderComponent {
  constructor(private router: Router) { }
}
