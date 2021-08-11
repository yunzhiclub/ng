import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {apis} from '../apis';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptor.forRoot(apis),
      multi: true
    }
  ]
})
export class ApiModule { }
