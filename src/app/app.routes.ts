import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent, DashboardComponent, MedicalExamComponent, LoginComponent } from './routes';
import { AuthGuard } from './shared';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'medical-exam/:id',
    component: MedicalExamComponent,
    canActivate: [AuthGuard]
  },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
