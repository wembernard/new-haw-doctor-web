import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent, DashboardComponent, MedicalExamComponent, LoginComponent, MeComponent } from './routes';
import { AuthGuard, AUTH_GUARD_PROVIDERS } from './shared';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'me',
    component: MeComponent,
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
