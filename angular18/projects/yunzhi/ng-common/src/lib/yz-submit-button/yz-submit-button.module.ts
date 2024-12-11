import {NgModule} from '@angular/core';
import {YzSubmitButtonDirective} from './yz-submit-button.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    YzSubmitButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YzSubmitButtonDirective
  ]
})
export class YzSubmitButtonModule {
}
