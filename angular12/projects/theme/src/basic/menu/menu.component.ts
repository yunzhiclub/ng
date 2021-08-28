import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BasicService} from '../service/basic.service';
import {Menu} from '../entity/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  menus = new Array<Menu>();
  private subscription: Subscription | undefined;
  private color = {
    active: {
      background: '#EB595E',
      color: '#fff',
      leftBorder: '#fff',
      rightBorder: '#0F66D4'
    },
    normal: {
      background: '#fff',
      color: '#000000',
      leftBorder: '#EB595E',
      rightBorder: '#fff'
    }
  };

  constructor(private basicMenuService: BasicService) {
  }

  ngOnInit(): void {
    if (this.basicMenuService.getMenuColor() !== null && this.basicMenuService.getMenuColor() !== undefined) {
      this.color = this.basicMenuService.getMenuColor();
    }
    this.basicMenuService.getMenus().subscribe(menus =>
      this.menus = menus);
  }

  /**
   * 对当前菜单、非当前菜单设置不同的颜色
   */
  getStyle(link: HTMLAnchorElement) {
    if (this.isActive(link)) {
      return {
        'border-left-color': this.color.active.leftBorder,
        'border-right-color': this.color.active.rightBorder,
        'background-color': this.color.active.background,
        'color': this.color.active.color
      }
    } else {
      return {
        'border-left-color': this.color.normal.leftBorder,
        'border-right-color': this.color.normal.rightBorder,
        'background-color': this.color.normal.background,
        'color': this.color.normal.color
      }
    }
  }

  /**
   * 判断当前菜单是否激活
   */
  isActive(link: HTMLAnchorElement): boolean {
    return link.className.split(' ').indexOf('active') > -1;
  }

  /**
   * 鼠标移出时，还原对应的颜色
   */
  onMouseleave(link: HTMLAnchorElement) {
    if (!this.isActive(link)) {
      link.style.borderRightColor = this.color.normal.rightBorder;
      link.style.borderLeftColor = this.color.normal.leftBorder;
      link.style.color = this.color.normal.color;
      link.style.backgroundColor = this.color.normal.background;
    }
  }

  /**
   * 鼠标进入时，添加对应的颜色
   */
  onMouseover(link: HTMLAnchorElement) {
    if (!this.isActive(link)) {
      link.style.borderRightColor = this.color.active.rightBorder;
      link.style.borderLeftColor = this.color.active.leftBorder;
      link.style.color = this.color.active.color;
      link.style.backgroundColor = this.color.active.background;
    }
  }

  ngOnDestroy(): void {
    if (null !== this.subscription && undefined !== this.subscription) {
      /** 取消订阅 */
      this.subscription.unsubscribe();
    }
  }
}
