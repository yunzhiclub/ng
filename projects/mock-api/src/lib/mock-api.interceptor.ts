import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MockObservable} from './mock-observable';
import {MockApiService} from './mock-api.service';
import {Type} from '@angular/core';
import {MockApiInterface} from './mock-api.interface';

/**
 * 模拟拦截器.
 */
export class MockApiInterceptor implements HttpInterceptor {
  /**
   * 此静态变量应该变到构造函数中初始化.
   * 区别：
   * 1. 属性初始化：其它文件import本文件时执行
   * 2. 构造函数：实例化时执行
   */
  private static mockApiService = null as MockApiService;

  static forRoot(mockApis: Type<MockApiInterface>[]): Type<HttpInterceptor> {
    const mockApiService = MockApiService.getMockApiService(
      new MockObservable()
    );

    mockApiService.registerMockApis(mockApis);
    MockApiInterceptor.mockApiService = mockApiService;
    return MockApiInterceptor;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return MockApiInterceptor.mockApiService.request<HttpRequest<any>>(req);
  }
}
