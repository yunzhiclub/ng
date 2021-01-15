import {NgModule} from '@angular/core';
import {MockObservableTesting} from './mock-observable.testing';
import {MockHttpClientModule} from '@yunzhi/ng-mock-http-client';
import {MockObservable} from '@yunzhi/ng-mock-http-client';

/**
 * 模拟后台接口模块
 * 由于MockHttpClient依赖于MockApiService
 * 所以必须先声明MockApiService，然后再声明MockHttpClient
 * 否则将产生依赖异常
 *
 * 每增加一个后台模拟接口，则需要对应添加到providers。
 * 否则模拟接口将被angular的摇树优化摇掉，从而使得其注册方法失败
 */
@NgModule({
  imports: [
    MockHttpClientModule
  ],
  providers: [
    {provide: MockObservable, useClass: MockObservableTesting}
  ]
})
export class MockHttpClientTestingModule {
}
