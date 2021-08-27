import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicComponent} from './basic.component';
import {RouterModule} from '@angular/router';
import {HeaderModule} from './header/header.module';
import {MenuModule} from './menu/menu.module';
import {NavModule} from './nav/nav.module';
import {BasicService} from './service/basic.service';

/**
 * 基本主题
 * @author panjie
 */
@NgModule({
  declarations: [BasicComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    MenuModule,
    NavModule
  ],
  exports: [BasicComponent],
  providers: [
    BasicService
  ]
})
export class BasicModule {
}
