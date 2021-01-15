import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MockHttpClientModule, MockHttpClientService} from '@yunzhi/ng-mock-http-client';
import {UserApi} from './user.api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 使用MockHttpClientModule，替换HttpClientModule
    MockHttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

MockHttpClientService.registerMockApi(UserApi);
