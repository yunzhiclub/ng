import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {DelayHandlerTesting} from './delay-handler.testing';
import {Type} from '@angular/core';

import {MockApiService, MockApiInterface} from 'packages/mock-api/src/public-api';


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
  private static mockApiService: MockApiService | undefined;

  /**
   * 配置信息
   */
  private static config = {} as {filter?: (req: HttpRequest<any>) => boolean};

  /**
   * 启动时注册API
   * @param mockApis 模拟API
   * @param config 配置信息
   */
  static forRoot(mockApis: Type<MockApiInterface>[], config?: {filter?: (req: HttpRequest<any>) => boolean}): Type<HttpInterceptor> {
    const mockApiService = MockApiService.getMockApiService(
      new DelayHandlerTesting()
    );

    mockApiService.registerMockApis(mockApis);
    MockApiTestingInterceptor.mockApiService = mockApiService;
    MockApiTestingInterceptor.config = config ? config : {};
    return MockApiTestingInterceptor;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (MockApiTestingInterceptor.config && typeof MockApiTestingInterceptor.config.filter === 'function') {
      try {
        if (!MockApiTestingInterceptor.config.filter(req)) {
          return next.handle(req);
        }
      } catch (e) {
        console.warn("在调用过滤器时发生异常", e);
      }
    }
    return MockApiTestingInterceptor.mockApiService!.request<HttpRequest<any>>(req);
  }
}
