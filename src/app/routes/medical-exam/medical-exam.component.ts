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
  isExpanded;
  paramSub;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.isExpanded = false;
  }

  ngOnInit() {
    this.paramSub = this.route.params.subscribe((params: { id: number }) => {
      let id = +params.id;

      /* Global data from medicalExam */
      this.api.call('medicalExams/' + id + '?filter[include]=employee&filter[include]=weights&filter[include]=pressures').then(res => {
        this.medicalExam = res.json() || {};
      });

      /* Answers from medicalExam */
      this.api.call('medicalExams/' + id + '/answers?filter[include]=question').then(res => {
        this.answers = res.json() || [];
      });
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  goBack() {
    window.history.back();
  }

  toggleAnswer() {
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded);
  }
}
