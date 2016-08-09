import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../shared';

@Component({
  selector: 'medical-form',
  template: require('./medical-form.component.html'),
  styles: [String(require('./medical-form.component.scss'))],
  providers: [ApiService]
})

export class MedicalFormComponent implements OnInit {
  results: any;
  processed: boolean;
  isExpanded: boolean;

  constructor(private api: ApiService) { 
    this.processed = false;
    this.isExpanded = false;
  }

  @Input('medicalExamId') medicalExamId: number;

  ngOnInit() {
    /* Answers from medicalExam */
    this.api.call('medicalExams/' + this.medicalExamId + '/answers?filter[include]=question').then(res => {
      let answers = res.json() || [];
      this.results = { outcome: 0, themes: {} };
      for (let answer of answers) {
        /** BUILDING DATA STRUCTURE */
        // Build themes array
        if (!this.results.themes[answer['question']['theme']]) {
          this.results.themes[answer['question']['theme']] = { outcome: 0, subthemes: {} };
        }
        /** Build subthemes array */
        if (!this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']]) {
          this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']] = { outcome: 0, answers: [] };
        }

        /** FEED ANSWER */
        this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']].answers.push(answer);

        /** UPDATING OUTCOME */
        // Update subtheme outcome if necessary
        if (this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']].outcome < answer.outcome) {
          this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']].outcome = answer.outcome;
        }
        // Update theme outcome if necessary
        if (this.results.themes[answer['question']['theme']].outcome < answer.outcome) {
          this.results.themes[answer['question']['theme']].outcome = answer.outcome;
        }
        // Update results outcome if necessary
        if (this.results.outcome < answer.outcome) {
          this.results.outcome = answer.outcome;
        }
      }
      this.processed = true;
    });
  }

  public objectToArray(obj: Object): string[] {
    return Object.keys(obj);
  }

  public toggleAnswer() {
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded);
  }

}
