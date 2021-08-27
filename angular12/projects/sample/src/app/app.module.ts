import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Component} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppInterceptor} from './app.interceptor';
import {ApiModule} from './api/api.module';
import {BasicModule} from 'theme';
import {ThemeComponent} from './theme/theme.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class RootComponent {
}


@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BasicModule,
    ApiModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [RootComponent]
})
export class AppModule {
}

