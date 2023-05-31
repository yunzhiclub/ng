import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
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
      useClass: MockApiInterceptor.forRoot(apis, {
        filter: (req: HttpRequest<any>) => !req.url.startsWith('assets')
      }),
      multi: true
    }
  ]
})
export class ApiModule { }
