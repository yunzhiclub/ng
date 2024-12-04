import {Component} from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../public-api';

@Component({
  standalone: true,
  selector: 'theme-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  imports: [
    MenuComponent,
    HeaderComponent,
    CommonModule,
    NavComponent
  ],
  providers: [
    ThemeService
  ]
})
export class BasicComponent {
  /**
   * 当前是否为默认密码
   */
  default = false;

  constructor() {
  }

  /**
   * 关闭提示信息
   */
  closeToast(): void {
    this.default = false;
  }
}
