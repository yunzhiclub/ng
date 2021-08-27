import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {BasicMenuService} from '../service/basic-menu.service';
import {Menu} from '../entity/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  menus = new Array<Menu>();
  private subscription: Subscription | undefined;

  constructor(private basicMenuService: BasicMenuService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.basicMenuService.getMenus().subscribe(menus =>
      this.menus = menus);
  }

  /**
   * 判断当前菜单是否激活
   * @param menu 菜单
   */
  active(menu: Menu): boolean {

    // 定义主路由
    let mainRoute: string;

    // 根据是否有第2个/选择截取方式
    // 从urlSegment[1]开始是因为urlSegment[0] === ""
    const urlSegment = this.router.url.split('/');
    // if (urlSegment[1] === 'teacher' || urlSegment[1] === 'student') {
    //   mainRoute = urlSegment[1] + '/' + urlSegment[2];
    // } else {
    mainRoute = urlSegment[1];
    // }

    // 判断当前路由是否激活
    return mainRoute === menu.url;
  }

  ngOnDestroy(): void {
    if (null !== this.subscription && undefined !== this.subscription) {
      /** 取消订阅 */
      this.subscription.unsubscribe();
    }
  }
}
