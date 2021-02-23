import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserApi} from './user.api';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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

