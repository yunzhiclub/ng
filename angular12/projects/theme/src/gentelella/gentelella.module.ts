import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GentelellaRoutingModule} from './gentelella-routing.module';
import {GentelellaComponent} from './gentelella.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TopNavBarComponent} from './top-nav-bar/top-nav-bar.component';
import {FooterComponent} from './footer/footer.component';

/**
 * 模板地址：https://github.com/ColorlibHQ/gentelella
 */
@NgModule({
  declarations: [
    GentelellaComponent,
    SidebarComponent,
    TopNavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    GentelellaRoutingModule
  ],
  exports: [
    GentelellaComponent
  ]
})
export class GentelellaModule {
}
