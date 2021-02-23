import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MockObservable} from './mock-observable';
import {MockApiService} from './mock-api.service';

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

  constructor() {
    if (null === MockApiInterceptor.mockApiService) {
      /**
       * 注意非测试环境下的MockObservable(不支持cold hot等测试专用方法).
       */
      MockApiInterceptor.mockApiService = MockApiService.getMockApiService(
        new MockObservable()
      );
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return MockApiInterceptor.mockApiService.request<HttpRequest<any>>(req);
  }
}
