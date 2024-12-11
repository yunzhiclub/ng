import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {MockApiInterceptor} from "../../projects/yunzhi/ng-mock-api/src/lib/mock-api.interceptor";
import {UserApi} from "../mock-api/user.api";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor.forRoot([UserApi]), multi: true
    }
  ]
};
