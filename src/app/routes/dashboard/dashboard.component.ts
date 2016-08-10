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
      console.log('loaded');
      this.medicalExams = res.json() || [];
      if (this.medicalExams.length > 0) {
        this.medicalExams.sort((a: any, b: any) => {
          if (a.outcomeMax < b.outcomeMax) {
            return 1;
          } else if (a.outcomeMax > b.outcomeMax) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      console.log(this.medicalExams);
    });
  };

  gotoDetail(code: string) {
    this.router.navigate(['/medical-exam', code]);
  }
}
