import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Subscription} from 'rxjs';
import {BasicService} from '../service/basic.service';
import {YzMenu} from '../entity/yz-menu';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  // 定义动画，但并没有生效
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'block'
      })),
      state('closed', style({
        display: 'none'
      })),
      transition('open => closed', [
        animate('0.1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.1s ease-in-out')
      ])
    ])
  ],
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChildren('link')
  links: QueryList<ElementRef<HTMLAnchorElement>>;

  menus = new Array<MenuModel>();

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
  private activeStyle = {
    'border-left-color': MenuComponent.hexToRgbA(this.color.active.leftBorder),
    'border-right-color': MenuComponent.hexToRgbA(this.color.active.rightBorder),
    'background-color': MenuComponent.hexToRgbA(this.color.active.background),
    'color': MenuComponent.hexToRgbA(this.color.active.color)
  }

  private normalStyle = {
    'border-left-color': MenuComponent.hexToRgbA(this.color.normal.leftBorder),
    'border-right-color': MenuComponent.hexToRgbA(this.color.normal.rightBorder),
    'background-color': MenuComponent.hexToRgbA(this.color.normal.background),
    'color': MenuComponent.hexToRgbA(this.color.normal.color)
  }

  constructor(private basicMenuService: BasicService,
              private router: Router) {
  }

  /**
   * 16进制的颜色信息转换为rgba的颜色信息
   * @param hex #abcdef
   * @param opacity rbgb(xx,xx,xx,xx)
   */
  public static hexToRgbA(hex: string, opacity = 1) {
    let color;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      color = hex.substring(1).split('');
      if (color.length == 3) {
        color = [color[0], color[0], color[1], color[1], color[2], color[2]];
      }
      color = Number.parseInt(color.join(''), 16);
      return 'rgba(' + [(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',') + `,${opacity})`;
    }
    throw new Error('Bad Hex');
  }

  ngOnInit(): void {
    const colors = this.basicMenuService.getColors();
    if (colors && colors.menu) {
      this.color = colors.menu;
    }
    this.basicMenuService.getMenus().subscribe(menus =>
      this.menus = menus.map(menu => new MenuModel(menu)));
  }

  /**
   * 对当前菜单、非当前菜单设置不同的颜色
   */
  getStyle(menu: MenuModel, link: HTMLAnchorElement, opacity = 1) {
    if (this.isActive(menu, link)) {
      return this.activeStyle;
    } else {
      return this.normalStyle;
    }
  }

  /**
   * 判断当前菜单是否激活
   */
  isActive(menu: MenuModel, link: HTMLAnchorElement): boolean {
    return menu.showChildren || (link.className.split(' ').indexOf('active') > -1);
  }

  /**
   * 鼠标移出时，还原对应的颜色
   */
  onMouseleave(menu: MenuModel, link: HTMLAnchorElement, opacity = 1) {
    if (!this.isActive(menu, link)) {
      link.style.borderRightColor = MenuComponent.hexToRgbA(this.color.normal.rightBorder, opacity);
      link.style.borderLeftColor = MenuComponent.hexToRgbA(this.color.normal.leftBorder, opacity);
      link.style.color = MenuComponent.hexToRgbA(this.color.normal.color, opacity);
      link.style.backgroundColor = MenuComponent.hexToRgbA(this.color.normal.background, opacity);
    }
  }

  /**
   * 鼠标进入时，添加对应的颜色
   */
  onMouseover(menu: MenuModel, link: HTMLAnchorElement, opacity = 1) {
    if (!this.isActive(menu, link)) {
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

  onMenuClick(menu: MenuModel) {
    const showChildren = !menu.showChildren;
    this.menus.forEach(m => m.showChildren = false);
    if (menu.beParent) {
      menu.showChildren = showChildren;
    }

    if (!menu.beAbstract) {
      // 非抽像，在弹出下拉菜单的同时完成跳转
      this.router.navigateByUrl(menu.url).then();
    }
  }

  onSubMenuClick(menu: MenuModel, childMenu: MenuModel) {
    if (childMenu.beAbsolute) {
      this.router.navigateByUrl(childMenu.url).then();
    } else {
      this.router.navigateByUrl(menu.url + '/' + childMenu.url).then();
    }
  }
}

class MenuModel implements YzMenu {
  /**
   * 是否被选中
   */
  active= false;
  showChildren = false;
  private readonly menu: YzMenu;
  private readonly _children: MenuModel[];

  constructor(menu: YzMenu) {
    this.menu = menu;
    if (!Array.isArray(this.menu.children)) {
      this._children = [];
    } else {
      this._children = this.menu.children.map(menu => new MenuModel(menu));
    }
  }

  get beAbstract(): boolean {
    if (typeof this.menu.beAbstract === 'undefined') {
      return false;
    }
    return this.menu.beAbstract;
  }

  /**
   * 子菜单
   */
  get children(): MenuModel[] {
    return this._children;
  }

  get description(): string {
    return this.menu.description;
  }

  get icon(): string {
    return this.menu.icon;
  }

  get name(): string {
    return this.menu.name;
  }

  get url(): string {
    return this.menu.url;
  }

  get beParent() {
    return this.menu.children && this.menu.children.length > 0;
  }

  get beAbsolute() {
    return this.menu.beAbsolute;
  }
}
