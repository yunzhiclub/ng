import {Component, Injectable, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  YzPageComponent,
  YzSizeComponent,
  YzUploaderComponent,
  YzUploaderService
} from '../../projects/yunzhi/ng-common/src/public-api';
import {BasicComponent, ThemeService, YzMenu} from '../../projects/yunzhi/ng-theme/src/public-api';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";


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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BasicComponent, YzPageComponent, YzSizeComponent, YzUploaderComponent],
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

  showUploader = signal(false);

  onUploaderClose() {
    this.showUploader.set(false);
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
