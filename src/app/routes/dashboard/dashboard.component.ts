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
    this.api.call('medicalExams/examsWithOutcomeAndStatus').then(res => { 
      this.medicalExams = res.json() || [];
      if (this.medicalExams.length > 0) {
        this.medicalExams.sort((a: any, b: any) => {
          if (a.outcome < b.outcome) {
            return 1;
          } else if (a.outcome > b.outcome) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    });
  };

  gotoDetail(code: string) {
    this.router.navigate(['/medical-exam', code]);
  }
}
