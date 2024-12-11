import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { MockApiInterface } from '../../../../ng-mock-api/src/public-api';
import { MockApiTestingInterceptor } from '../../../../ng-mock-api-testing/src/public-api';

const apis = [] as Type<MockApiInterface>[];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true, useValue: MockApiTestingInterceptor.forRoot(apis)
    }
  ]
})
export class ApiModule {
}
