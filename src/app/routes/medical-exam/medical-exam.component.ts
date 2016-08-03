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
  doctorNotes;
  employeeNotes;
  companyNotes;
  doctorNote = { type: 'doctor', content: '' };
  employeeNote = { type: 'employee', content: '' };
  companyNote = { type: 'company', content: '' };

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.isExpanded = false;
  }

  ngOnInit() {
    this.paramSub = this.route.params.subscribe((params: { id: number }) => {
      let id = +params.id;

      /* Global data from medicalExam */
      this.api.call('medicalExams/' + id + '?filter[include]=employee&filter[include]=weights&filter[include]=pressures').then(res => {
        this.medicalExam = res.json() || {};

        /* Notes from medicalExam */
        this.loadNotes();
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

  onSubmitEmploteeNote() {
    this.api.call('medicalExams/' + this.medicalExam.id + '/notes', 'post', this.doctorNote).then(res => {
      this.doctorNote.content = '';
    });
  }

  toggleAnswer() {
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded);
  }

  loadNotes(specificType?: string) {
    if (specificType != null && ['doctor', 'employee', 'company'].indexOf(specificType) >= 0) {
      this.api.call('medicalExams/' + this.medicalExam.id + '/notes?filter[where][type]=' + specificType).then(res => {
        this[specificType + 'Notes'] = res.json() || [];
      });
    } else {
      for (let type of ['doctor', 'employee', 'company']) {
        this.api.call('medicalExams/' + this.medicalExam.id + '/notes?filter[where][type]=' + type).then(res => {
          this[type + 'Notes'] = res.json() || [];
        });
      }
    }
  }

  submitNote(note: any) {
    return this.api.call('medicalExams/' + this.medicalExam.id + '/notes', 'post', note).then(res => {
      note.content = '';
      this.loadNotes(note.type);
    }).catch(res => {
      console.error(res);
      alert('Une erreur s\'est produite, consulter la console pour plus d\'information.');
      note.content = '';
    });
  }
}
