/**
 * 菜单服务
 */
import {Menu} from '../entity/menu';
import {Observable} from 'rxjs';

export class BasicMenuService {
  public getMenus(): Observable<Menu[]> {
    return new Observable(subscribe => {
      subscribe.next([{
        name: '首页',
        url: 'dashboard',
        icon: 'fa fa-tachometer-alt',
      }]);
      subscribe.complete();
    });
  }
}
