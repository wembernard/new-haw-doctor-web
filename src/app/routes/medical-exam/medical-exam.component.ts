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
  medicalNotes;
  doctorNotes;
  employeeNotes;
  companyNotes;
  doctorNote = { type: 'doctor', content: '' };
  employeeNote = { type: 'employee', content: '' };
  companyNote = { type: 'company', content: '' };

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.isExpanded = false;

    /* TEMP */
    this.medicalNotes = [
      {
        time: '2016-07-01T15:07:52.815Z',
        content: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en 
        page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 
        1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen 
        de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la 
        bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 
        1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, 
        par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.`
      },
      {
        time: '2016-07-21T15:07:52.815Z',
        content: `Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie 
        d'entre elles a été altérée par l'addition d'humour ou de mots aléatoires qui ne ressemblent pas une 
        seconde à du texte standard. Si vous voulez utiliser un passage du Lorem Ipsum, vous devez être sûr 
        qu'il n'y a rien d'embarrassant caché dans le texte. Tous les générateurs de Lorem Ipsum sur Internet 
        tendent à reproduire le même extrait sans fin, ce qui fait de lipsum.com le seul vrai générateur de 
        Lorem Ipsum. Iil utilise un dictionnaire de plus de 200 mots latins, en combinaison de plusieurs 
        structures de phrases, pour générer un Lorem Ipsum irréprochable. Le Lorem Ipsum ainsi obtenu ne 
        contient aucune répétition, ni ne contient des mots farfelus, ou des touches d'humour.`
      },
      {
        time: '2016-07-21T18:07:52.815Z',
        content: `Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie 
        d'entre elles a été altérée par l'addition d'humour ou de mots aléatoires qui ne ressemblent pas une 
        seconde à du texte standard. Si vous voulez utiliser un passage du Lorem Ipsum, vous devez être sûr 
        qu'il n'y a rien d'embarrassant caché dans le texte. Tous les générateurs de Lorem Ipsum sur Internet 
        tendent à reproduire le même extrait sans fin, ce qui fait de lipsum.com le seul vrai générateur de 
        Lorem Ipsum. Iil utilise un dictionnaire de plus de 200 mots latins, en combinaison de plusieurs 
        structures de phrases, pour générer un Lorem Ipsum irréprochable. Le Lorem Ipsum ainsi obtenu ne 
        contient aucune répétition, ni ne contient des mots farfelus, ou des touches d'humour.`
      },
      {
        time: '2016-08-01T15:07:52.815Z',
        content: `Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. 
        Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le 
        rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un 
        des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum, et en étudiant tous 
        les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. 
        Il provient en fait des sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" (Des Suprêmes 
        Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un 
        traité sur la théorie de l'éthique. Les premières lignes du Lorem Ipsum, "Lorem ipsum dolor sit amet...", 
        proviennent de la section 1.10.32.`
      },
    ];
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

      /* Notes from medicalExam */
      this.api.call('medicalExams/' + id + '/notes?filter[where][type]=doctor').then(res => {
        this.doctorNotes = res.json() || [];
      });
      this.api.call('medicalExams/' + id + '/notes?filter[where][type]=employee').then(res => {
        this.employeeNotes = res.json() || [];
      });
      this.api.call('medicalExams/' + id + '/notes?filter[where][type]=company').then(res => {
        this.companyNotes = res.json() || [];
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

  private submitNote(note: any) {
    return this.api.call('medicalExams/' + this.medicalExam.id + '/notes', 'post', note).then(res => {
      note.content = '';
      // Reload Notes with new one
    }).catch(res => {
      note.content = '';
    });
  }

}
