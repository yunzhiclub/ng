import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YzSizeComponent} from './yz-size.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [YzSizeComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    YzSizeComponent
  ]
})
export class YzSizeModule {
}
