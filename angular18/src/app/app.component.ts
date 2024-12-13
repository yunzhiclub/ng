import {Component, Injectable, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  YzPageComponent,
  YzSizeComponent, YzSortDirective, YzSorts,
  YzUploaderComponent,
  YzUploaderService
} from '../../projects/yunzhi/ng-common/src/public-api';
import {BasicComponent, ThemeService, YzMenu} from '../../projects/yunzhi/ng-theme/src/public-api';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";
import {Utils} from "@yunzhi/utils";


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

interface User {
  id: number,
  name: string,
  username: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BasicComponent, YzPageComponent, YzSizeComponent, YzUploaderComponent, YzSortDirective],
  template: `
    <theme-basic>
      <div class="row text-center">
        <button type="button" class="btn btn-sm btn-primary" (click)="onToggleShowUploader()">toggle上传组件</button>
      </div>

      @if (showUploader()) {
        <yz-uploader
          (beUpload)="onUploaded()"
          (beClose)="onUploaderClose()"></yz-uploader>
      }
      <yz-size [size]="20" (beChange)="onSizeChange($event)"></yz-size>
      <h1>hello {{ page }}</h1>

      <yz-page [totalElements]="200" [page]="page" (changePage)="onPageChange($event)"></yz-page>


      <table class="table">
        <tr>
          <th>序号</th>
          <th [yzSort]="'id'" [yzSorts]="sorts" (beYzSortChange)="onSortChange($event)">ID</th>
          <th [yzSort]="'name'" [yzSorts]="sorts" (beYzSortChange)="onSortChange($event)">姓名</th>
          <th>用户名</th>
        </tr>
      </table>
    </theme-basic>`,
  providers: [
    {
      provide: ThemeService, useClass: MyThemeService
    }, {
      provide: YzUploaderService, useClass: UploaderService
    }
  ]
})
export class AppComponent {
  page = 0;

  sorts = {id: 'desc'} as YzSorts<User>;

  showUploader = signal(false);

  onUploaderClose() {
    this.showUploader.set(false);
  }

  onSortChange(sorts: YzSorts<User>) {
    this.sorts = sorts;
    const httpParams = new HttpParams().appendAll(Utils.)
  }

  onUploaded() {
    this.showUploader.set(false);
  }

  onPageChange(page: number) {
    this.page = page;
    of(null).pipe(delay(500)).subscribe(() => {
    });
  }

  onSizeChange(size: number): void {
    console.log('size change', size);
  }

  onToggleShowUploader() {
    this.showUploader.update(v => !v);
  }
}
