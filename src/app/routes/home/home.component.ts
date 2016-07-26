import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'home',
  template: require('./home.component.html'),
  styles: [ String(require('./home.component.scss')) ],
  directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent { }
