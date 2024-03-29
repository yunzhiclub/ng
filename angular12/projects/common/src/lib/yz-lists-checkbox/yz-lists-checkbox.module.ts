import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YzListsCheckboxComponent} from './yz-lists-checkbox.component';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 列表选择checkbox.
 * 比如选择所有的老师、所有的班级等。
 * 使用方法见：AllClazzCheckboxComponent
 */
@NgModule({
  declarations: [YzListsCheckboxComponent],
  exports: [
    YzListsCheckboxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class YzListsCheckboxModule {
}
