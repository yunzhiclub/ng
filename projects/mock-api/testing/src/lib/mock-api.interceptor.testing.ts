import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MockApiService} from '@yunzhi/ng-mock-api';
import {MockObservableTesting} from './mock-observable.testing';

/**
 * 测试专用模拟API拦截器.
 */
export class MockApiInterceptorTesting implements HttpInterceptor {
  private static mockApiService = null as MockApiService;

  constructor() {
    if (MockApiInterceptorTesting.mockApiService === null) {
      MockApiInterceptorTesting.mockApiService =
        MockApiService.getMockApiService(
          new MockObservableTesting()
        );
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return MockApiInterceptorTesting.mockApiService.request<HttpRequest<any>>(req);
  }
}
