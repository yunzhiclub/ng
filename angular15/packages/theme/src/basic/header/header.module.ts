import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';

/**
 * 头部.
 * 在单元测试时，需要对router的navigateByUrl方法进行spy，否则将在控制台引发一个跳转异常。
 * 参考：part/layout/layout.component.spec.ts
 */
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
