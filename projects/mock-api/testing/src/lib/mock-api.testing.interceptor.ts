import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {DelayHandlerTesting} from './delay-handler.testing';
import {Type} from '@angular/core';

// 集成测试请启用如下代码
import {MockApiService, MockApiInterface} from '@yunzhi/ng-mock-api';
// 开发时请启用如下代码
// import {MockApiInterceptor} from '../../../src/lib/mock-api.interceptor';
// import {MockApiService} from '../../../src/lib/mock-api.service';


/**
 * 测试专用模拟API拦截器.
 */
export class MockApiTestingInterceptor implements HttpInterceptor {

  /**
   * 此静态变量应该变到构造函数中初始化.
   * 区别：
   * 1. 属性初始化：其它文件import本文件时执行
   * 2. 构造函数：实例化时执行
   */
  private static mockApiService = null as MockApiService;

  /**
   * 启动时注册API
   * @param mockApis 模拟API
   */
  static forRoot(mockApis: Type<MockApiInterface>[]): Type<HttpInterceptor> {
    const mockApiService = MockApiService.getMockApiService(
      new DelayHandlerTesting()
    );

    mockApiService.registerMockApis(mockApis);
    MockApiTestingInterceptor.mockApiService = mockApiService;
    return MockApiTestingInterceptor;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return MockApiTestingInterceptor.mockApiService.request<HttpRequest<any>>(req);
  }
}
