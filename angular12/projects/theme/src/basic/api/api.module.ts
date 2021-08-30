import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {MockApiInterface} from '@yunzhi/ng-mock-api';

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
