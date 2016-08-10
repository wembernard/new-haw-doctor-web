import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeaderComponent } from './shared';

@Component({
  selector: 'haw-doctor-app',
  template: require('./app.component.html'),
  styles: [String(require('./app.component.scss'))],
  directives: [ROUTER_DIRECTIVES, HeaderComponent]
})

export class AppComponent {

}
