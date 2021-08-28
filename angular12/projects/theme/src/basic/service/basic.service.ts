import {Observable, of} from 'rxjs';
import {Menu} from '../entity/menu';

/**
 * 菜单服务
 */
export class BasicService {
  public getMenus(): Observable<Menu[]> {
    console.log('重此getMenus()实现自定义菜单');
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
    console.log('重写getCurrentLoginUser$()显示当前登录用户');
    return of({name: '张三'})
  }

  logout() {
    console.warn('重写logout()实现注销');
  }

  getTitle(): string {
    return '改写getTitle()实现自定义标题';
  }

  getHeaderImageSrc(): string {
    console.warn('重写getHeaderImageSrc()自定义头部图片');
    return '/assets/basic/image/header.png';
  }

  back(): void {
    console.warn('重写back()方法实现回退');
  }

  showBack(): Observable<boolean> {
    console.warn('重写showBack()方法来订制是否显示回退按钮');
    return of(true);
  }

  getMenuColor(): {
    active: {
      background: string,
      color: string,
      leftBorder: string,
      rightBorder: string
    },
    normal: {
      background: string,
      color: string,
      leftBorder: string,
      rightBorder: string
    }
  } {
    console.info('预自定义颜色信息，请重写此getMenuColor()方法');
    return null;
  }
}
