import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Subscription} from 'rxjs';
import {BasicService} from '../service/basic.service';
import {Menu} from '../entity/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChildren('link')
  links: QueryList<ElementRef<HTMLAnchorElement>>;

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

  /**
   * 16进制的颜色信息转换为rgba的颜色信息
   * @param hex #abcdef
   * @param opacity rbgb(xx,xx,xx,xx)
   */
  public static hexToRgbA(hex: string, opacity = 1){
    let color;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      color= hex.substring(1).split('');
      if(color.length== 3){
        color= [color[0], color[0], color[1], color[1], color[2], color[2]];
      }
      color= Number.parseInt(color.join(''), 16);
      return 'rgba('+[(color>>16)&255, (color>>8)&255, color&255].join(',')+`,${opacity})`;
    }
    throw new Error('Bad Hex');
  }


  constructor(private basicMenuService: BasicService) {
  }

  ngOnInit(): void {
    const colors = this.basicMenuService.getColors();
    if (colors && colors.menu) {
      this.color = colors.menu;
    }
    this.basicMenuService.getMenus().subscribe(menus =>
      this.menus = menus);
  }

  /**
   * 对当前菜单、非当前菜单设置不同的颜色
   */
  getStyle(link: HTMLAnchorElement, opacity = 1) {
    if (this.isActive(link)) {
      return {
        'border-left-color': MenuComponent.hexToRgbA(this.color.active.leftBorder),
        'border-right-color': MenuComponent.hexToRgbA(this.color.active.rightBorder),
        'background-color': MenuComponent.hexToRgbA(this.color.active.background),
        'color': MenuComponent.hexToRgbA(this.color.active.color)
      }
    } else {
      return {
        'border-left-color': MenuComponent.hexToRgbA(this.color.normal.leftBorder),
        'border-right-color': MenuComponent.hexToRgbA(this.color.normal.rightBorder),
        'background-color': MenuComponent.hexToRgbA(this.color.normal.background),
        'color': MenuComponent.hexToRgbA(this.color.normal.color)
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
  onMouseleave(link: HTMLAnchorElement, opacity = 1) {
    if (!this.isActive(link)) {
      link.style.borderRightColor = MenuComponent.hexToRgbA(this.color.normal.rightBorder, opacity);
      link.style.borderLeftColor = MenuComponent.hexToRgbA(this.color.normal.leftBorder, opacity);
      link.style.color = MenuComponent.hexToRgbA(this.color.normal.color, opacity);
      link.style.backgroundColor = MenuComponent.hexToRgbA(this.color.normal.background, opacity);
    }
  }

  /**
   * 鼠标进入时，添加对应的颜色
   */
  onMouseover(link: HTMLAnchorElement, opacity = 1) {
    if (!this.isActive(link)) {
      link.style.borderRightColor = MenuComponent.hexToRgbA(this.color.active.rightBorder, opacity);
      link.style.borderLeftColor = MenuComponent.hexToRgbA(this.color.active.leftBorder, opacity);
      link.style.color = MenuComponent.hexToRgbA(this.color.active.color);
      link.style.backgroundColor = MenuComponent.hexToRgbA(this.color.active.background, opacity);
    }
  }

  ngOnDestroy(): void {
    if (null !== this.subscription && undefined !== this.subscription) {
      /** 取消订阅 */
      this.subscription.unsubscribe();
    }
  }

}
