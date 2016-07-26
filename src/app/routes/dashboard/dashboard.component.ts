import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared';

@Component({
  selector: 'dashboard',
  template: require('./dashboard.component.html'),
  styles: [String(require('./dashboard.component.scss'))],
  providers: [ApiService]
})

export class DashboardComponent {
  medicalExams;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.call('medicalExams').then(res => {
      this.medicalExams = res.json() || [];
      console.log(this.medicalExams);
    });
  };
}
