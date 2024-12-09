import { Component, Injectable } from '@angular/core';
import { BasicComponent, ThemeService, YzMenu } from '../../projects/theme/src/public-api';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {YzPageComponent, YzSizeComponent} from '../../projects/common/src/public-api';

@Injectable()
export class MyThemeService extends ThemeService {
  public constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   * 获取当前登录用户
   */
  override getCurrentLoginUser$(): Observable<{ name: string }> {
    return this.httpClient.get<string>('/user/getCurrentUsername').pipe(map(v => {return {name: v};}))
  }

  /**
   * 获取菜单
   */
  override getMenus(): Observable<YzMenu[]> {
    console.log('重此getMenus()实现自定义菜单');
    return new Observable(subscribe => {
      subscribe.next([{
        name: '首页1',
        url: 'dashboard',
        icon: 'fa fa-tachometer-alt',
      }, {
        name: '父子菜单1',
        url: '',
        icon: 'fa fa-tachometer-alt',
        children: [{
          name: '首页',
          url: 'sub/dashboard',
          icon: 'fa fa-tachometer-alt',
        }, {
          name: '模板页',
          url: 'sub/theme',
          icon: 'fa fa-tachometer-alt',
        }, {
          name: '模板页',
          url: 'sub/theme',
          icon: 'fa fa-tachometer-alt',
        }]
      }, {
        name: '模板页',
        url: 'theme',
        icon: 'fa fa-tachometer-alt',
      }]);
      subscribe.complete();
    });
  }
}

@Component({
  selector: 'app-root',
  imports: [BasicComponent, YzPageComponent, YzSizeComponent],
  template: `
    <theme-basic>
      <yz-size [size]="20" (changeSize)="onSizeChange($event)"></yz-size>
      <h1>hello {{page}}</h1>
     <yz-page [totalElements]="200" [page]="9" (changePage)="onPageChange($event)"></yz-page>
    </theme-basic>`,
    providers: [
      {
        provide: ThemeService, useClass: MyThemeService
      }
    ]
})
export class AppComponent {
  title = 'angular19';
  page = 0;
  onPageChange(page: number) {
    this.page = page;
  }

  onSizeChange(size: number): void {
    console.log('size change', size);
  }
}
