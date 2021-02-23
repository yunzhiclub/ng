import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MockApiService} from '../../../src/lib/mock-api.service';
import {MockObservableTesting} from './mock-observable.testing';

/**
 * 测试专用模拟API拦截器.
 */
export class MockApiInterceptorTesting implements HttpInterceptor {
  private static mockApiService: MockApiService;

  constructor() {
    MockApiInterceptorTesting.mockApiService =
      MockApiService.getMockApiService(
        new MockObservableTesting()
      );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return MockApiInterceptorTesting.mockApiService.request<HttpRequest<any>>(req);
  }
}
