import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent, DashboardComponent } from './routes'

const routes: RouterConfig = [
    {
        path: '',
        component: HomeComponent        
    },
    {
        path: 'dashboard',
        component: DashboardComponent        
    },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
