import { Routes } from '@angular/router';
import {TemplateComponent} from "./template/template.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'sub/theme',
    component: TemplateComponent
  },
  {
    path: 'theme',
    component: TemplateComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
