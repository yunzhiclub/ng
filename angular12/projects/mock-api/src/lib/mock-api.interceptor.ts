import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DelayHandler} from './delay-handler';
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
      new DelayHandler()
    );

    mockApiService.registerMockApis(mockApis);
    MockApiInterceptor.mockApiService = mockApiService;
    MockApiInterceptor.config = config ? config : {};
    return MockApiInterceptor;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (MockApiInterceptor.config && typeof MockApiInterceptor.config.filter === 'function') {
      try {
        if (!MockApiInterceptor.config.filter(req)) {
          return next.handle(req);
        }
      } catch (e) {
        console.warn("在调用过滤器时发生异常", e);
      }
    }
    return MockApiInterceptor.mockApiService.request<HttpRequest<any>>(req);
  }
}
