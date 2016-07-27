import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../shared';

@Component({
  selector: 'dashboard',
  template: require('./dashboard.component.html'),
  styles: [String(require('./dashboard.component.scss'))],
  providers: [ApiService]
})

export class DashboardComponent implements OnInit {
  medicalExams;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.call('medicalExams?filter[include]=employee').then(res => {
      this.medicalExams = res.json() || [];
      console.log(this.medicalExams);
    });
  };

  gotoDetail(code: string) {
    this.router.navigate(['/medical-exam', code]);
  }
}
