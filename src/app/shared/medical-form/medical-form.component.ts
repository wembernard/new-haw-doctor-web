import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../shared';

@Component({
  selector: 'medical-form',
  template: require('./medical-form.component.html'),
  styles: [String(require('./medical-form.component.scss'))],
  providers: [ApiService]
})

export class MedicalFormComponent implements OnInit {
  @Input() medicalExamId: number;

  results: any;
  processed: boolean;

  constructor(private api: ApiService) {
    this.processed = false;
  }

  ngOnInit() {
    /* Answers from medicalExam */
    this.api.call('medicalExams/' + this.medicalExamId + '/answers?filter[include]=question&filter[order]=questionId').then(res => {
      let answers = res.json() || [];
      this.results = { outcome: 0, themes: {} };
      for (let answer of answers) {
        /** BUILDING DATA STRUCTURE */
        // Build themes array
        if (!this.results.themes[answer['question']['theme']]) {
          this.results.themes[answer['question']['theme']] = { outcome: 0, isExpanded: false, subthemes: {} };
        }
        /** Build subthemes array */
        if (!this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']]) {
          this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']] = { outcome: 0, isExpanded: false, answers: [] };
        }

        /** CHECK ANSWER EXPANSION */
        answer.isExpanded = (answer.outcome > 1);

        /** DISPLAY FEATURES */
        answer.isArray = Array.isArray(answer.value);

        /** FEED ANSWER */
        this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']].answers.push(answer);

        /** UPDATING OUTCOME & EXPANSION */
        // Update subtheme outcome & expansion if necessary
        if (this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']].outcome < answer.outcome) {
          this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']].outcome = answer.outcome;
          this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']].isExpanded = answer.isExpanded || this.results.themes[answer['question']['theme']].subthemes[answer['question']['subtheme']].isExpanded;
        }
        // Update theme outcome & expansion if necessary
        if (this.results.themes[answer['question']['theme']].outcome < answer.outcome) {
          this.results.themes[answer['question']['theme']].outcome = answer.outcome;
          this.results.themes[answer['question']['theme']].isExpanded = answer.isExpanded || this.results.themes[answer['question']['theme']].isExpanded;
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

  public toggleExpansion(event: MouseEvent, obj: any) {
    event.stopPropagation();
    obj.isExpanded = !obj.isExpanded;
  }
}
