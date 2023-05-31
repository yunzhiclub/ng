import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MockApiTestingInterceptor} from 'projects/mock-api/testing/src/public-api';
import {MockApiInterface} from 'projects/mock-api/src/public-api';

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
