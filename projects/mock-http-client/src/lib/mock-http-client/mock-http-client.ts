import {Observable} from 'rxjs';
import {MockHttpClientService} from './mock-http-client.service';
import {HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

/**
 * 模拟httpClient
 * 用于在测试环境中替换真实的HttpClient
 */
@Injectable()
export class MockHttpClient {

  constructor(private mockApiService: MockHttpClientService) {
  }

  delete<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.mockApiService.delete<T>(url, options);
  }

  get<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {
    return this.mockApiService.get<T>(url, options);
  }

  patch<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.mockApiService.patch<T>(url, body, options);
  }


  post<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.mockApiService.post<T>(url, body, options);
  }

  put<T>(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.mockApiService.put<T>(url, body, options);
  }

  request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>> {
    return this.mockApiService.request(req);
  }
}

