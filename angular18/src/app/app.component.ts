import {Component, Injectable} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  YzUploaderService
} from '../../projects/yunzhi/ng-common/src/public-api';
import {BasicComponent, ThemeService, YzMenu} from '../../projects/yunzhi/ng-theme/src/public-api';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
class UploaderService extends YzUploaderService {

}


@Injectable()
export class MyThemeService extends ThemeService {
  public constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   * 获取当前登录用户
   */
  override getCurrentLoginUser$(): Observable<{name: string}> {
    return this.httpClient.get<string>('/user/getCurrentUsername').pipe(map(v => {
      return {name: v};
    }))
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
          url: 'sub/theme1',
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
  standalone: true,
  imports: [RouterOutlet, BasicComponent],
  template: `<theme-basic><router-outlet></router-outlet></theme-basic>`,
  providers: [
    {
      provide: ThemeService, useClass: MyThemeService
    }, {
      provide: YzUploaderService, useClass: UploaderService
    }
  ]
})
export class AppComponent {
}
