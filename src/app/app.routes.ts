import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent, DashboardComponent, MedicalExamComponent, LoginComponent } from './routes';
import { AuthGuard, AUTH_GUARD_PROVIDERS } from './shared';

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
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medical-exam/:id',
    component: MedicalExamComponent,
    canActivate: [AuthGuard]
  },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_GUARD_PROVIDERS
];
