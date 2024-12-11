import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {ThemeService} from '../service/theme.service';
import {Observable} from 'rxjs';
import {YzMenu} from '../entity/yz-menu';
import { Component, ViewChild } from '@angular/core';
import { provideLocationMocks } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';


@Component({
  standalone: true,
  template: '<theme-menu #child></theme-menu>',
  imports: [MenuComponent]
})
class TestComponent {
  @ViewChild('child')
  menuComponent: MenuComponent | undefined;
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuComponent,
        RouterTestingModule
      ], providers: [
        {provide: ThemeService, useClass: MyBasicService}
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.links!.get(1)!.nativeElement.className += 'active';
    fixture.detectChanges();
  });

  it('getColorWithRadix', () => {
    expect('rgba(251,175,255,1)').toEqual(MenuComponent.hexToRgbA('#fbafff', 1));
  });

  afterEach(() => {
    fixture.autoDetectChanges();
  });
});


class MyBasicService extends ThemeService {
  /**
   * 获取菜单
   */
  override getMenus(): Observable<YzMenu[]> {
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
      }]);
      subscribe.complete();
    });
  }
}

