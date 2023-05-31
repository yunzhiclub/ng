import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BasicComponent} from '@yunzhi/ng-theme';
import {ThemeComponent} from './theme/theme.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '',
    component: BasicComponent,
    data: {
      title: '首页'
    },
    children: [
      {
        path: 'dashboard',
        component: AppComponent,
        data: {
          title: '控制面板'
        }
      },
      {
        path: 'theme',
        data: {
          title: '主题'
        },
        children: [
          {
            path: '',
            component: ThemeComponent,
            data: {
              title: '主题1'
            },
          }
        ]
      }],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
