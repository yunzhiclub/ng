import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {MockObservableTesting} from './mock-observable.testing';
// 开发时请移除以下行注释
// import {MockApiService} from '@yunzhi/ng-mock-api';
// 开发时请将下行注释掉
import {MockApiService} from '../../../src/lib/mock-api.service';


/**
 * 测试专用模拟API拦截器.
 */
export class MockApiInterceptorTesting implements HttpInterceptor {
  private static mockApiService = MockApiService.getMockApiService(
    new MockObservableTesting()
  );

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return MockApiInterceptorTesting.mockApiService.request<HttpRequest<any>>(req);
  }
}
