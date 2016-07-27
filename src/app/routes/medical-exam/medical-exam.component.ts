import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../shared';

@Component({
  selector: 'medical-exam',
  template: require('./medical-exam.component.html'),
  styles: [String(require('./medical-exam.component.scss'))],
  providers: [ApiService]
})

export class MedicalExamComponent implements OnInit, OnDestroy {
  medicalExam;
  answers;
  paramSub;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramSub = this.route.params.subscribe(params => {
      let id = +params['id'];

      // Global data from medicalExam
      this.api.call('medicalExams/' + id + '?filter[include]=employee&filter[include]=weights&filter[include]=pressures').then(res => {
        this.medicalExam = res.json() || {};
        console.log(this.medicalExam);
      });

      // Answers from medicalExam
      this.api.call('medicalExams/' + id + '/answers?filter[include]=question').then(res => {
        this.answers = res.json() || [];
        console.log(this.answers);
      });
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  goBack() {
    window.history.back();
  }
}
