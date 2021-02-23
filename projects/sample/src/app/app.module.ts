import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserApi} from './user.api';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// 开发时请启用如下代码
// import {MockApiInterceptor} from '../../../mock-api/src/lib/mock-api.interceptor';
// 集成测试请启用如下代码
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptor.forRoot([UserApi]),
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

