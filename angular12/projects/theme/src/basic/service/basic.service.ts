import {Observable, of} from 'rxjs';
import {Menu} from '../entity/menu';

/**
 * 菜单服务
 */
export class BasicService {
  public getMenus(): Observable<Menu[]> {
    return new Observable(subscribe => {
      subscribe.next([{
        name: '首页',
        url: 'dashboard',
        icon: 'fa fa-tachometer-alt',
      }, {
        name: '模板页',
        url: 'theme',
        icon: 'fa fa-tachometer-alt',
      }]);
      subscribe.complete();
    });
  }

  getCurrentLoginUser$(): Observable<{ name: string }> {
    return of({name: '张三'})
  }

  logout() {
    console.warn('重写此方法实现注销');
  }

  getTitle(): string {
    return '改写此方法实现抛出标题';
  }

  getHeaderImageSrc(): string {
    return '/assets/basic/image/header.png';
  }

  back(): void {
    console.warn('重写此方法实现回退');
  }

  showBack(): Observable<boolean> {
    console.warn('重写此方法来订制是否显示回退按钮');
    return of(true);
  }
}
