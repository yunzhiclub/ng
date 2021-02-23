import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserApi} from './user.api';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiInterceptor} from '../../../mock-api/src/lib/mock-api.interceptor';
import {MockApiService} from '../../../mock-api/src/lib/mock-api.service';

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
    {provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

MockApiService.registerMockApi(UserApi);

