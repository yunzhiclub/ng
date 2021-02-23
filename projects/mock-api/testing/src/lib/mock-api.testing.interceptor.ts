import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {MockTestingObservable} from './mock-testing.observable';
// 集成测试请启用如下代码
import {MockApiService} from '@yunzhi/ng-mock-api';
// 开发时请启用如下代码
// import {MockApiService} from '../../../src/lib/mock-api.service';


/**
 * 测试专用模拟API拦截器.
 */
export class MockApiTestingInterceptor implements HttpInterceptor {
  private static mockApiService = MockApiService.getMockApiService(
    new MockTestingObservable()
  );

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return MockApiTestingInterceptor.mockApiService.request<HttpRequest<any>>(req);
  }
}
