import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent, DashboardComponent, MedicalExamComponent } from './routes';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    redirectTo: '/dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'medical-exam/:id',
    component: MedicalExamComponent
  },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
