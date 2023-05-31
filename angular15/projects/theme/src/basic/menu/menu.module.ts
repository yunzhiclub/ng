import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule {
}
