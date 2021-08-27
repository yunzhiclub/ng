import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BasicComponent} from 'theme';
import {ThemeComponent} from './theme/theme.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  {
    path: '',
    component: BasicComponent,
    children: [
      {
        path: 'dashboard',
        component: AppComponent
      },
      {
        path: 'theme',
        component: ThemeComponent
      }],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
