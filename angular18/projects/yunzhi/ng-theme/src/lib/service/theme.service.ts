import {Observable, of} from 'rxjs';
import {YzMenu} from '../entity/yz-menu';
import { Injectable } from '@angular/core';

/**
 * 菜单服务
 */
@Injectable({
  providedIn: 'root' // 默认提供到全局 DI 容器
})
export class ThemeService {
  /**
   * 回退
   */
  back(): void {
    console.warn('重写back()方法实现回退');
  }

  /**
   * 获取颜色信息
   */
  getColors(): {
    menu: {
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
    },
    title: {
      color: string
    }
  } | null {
    console.info('预自定义颜色信息，请重写此getMenuColor()方法');
    return null;
  }

  /**
   * 获取当前登录用户
   */
  getCurrentLoginUser$(): Observable<{ name: string }> {
    console.log('重写getCurrentLoginUser$()显示当前登录用户');
    return of({name: '张三'})
  }

  /**
   * 头部图片的链接
   */
  getHeaderImageSrc(): string {
    console.warn('重写getHeaderImageSrc()自定义头部图片');
    return '/assets/header.png';
  }

  /**
   * 获取菜单
   */
  getMenus(): Observable<YzMenu[]> {
    console.log('重此getMenus()实现自定义菜单');
    return new Observable(subscribe => {
      subscribe.next([{
        name: '首页',
        url: 'dashboard',
        icon: 'fa fa-tachometer-alt',
      }, {
        name: '父子菜单',
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

  /**
   * 标题
   */
  getTitle(): Observable<string> {
    return of('改写getTitle()实现自定义标题');
  }

  /**
   * 是否显示回退
   */
  isShowBack$(): Observable<boolean> {
    console.warn('重写isShowBack$()方法来订制是否显示回退按钮');
    return of(true);
  }

  /**
   * 点击用户姓名的事件
   */
  onClickUserName(): void {
    console.warn('重写onClickUserName()方法来订制点击用户姓名的事件');
  }

  /**
   * 注销
   */
  logout(): void {
    console.warn('重写logout()实现注销');
  }
}
