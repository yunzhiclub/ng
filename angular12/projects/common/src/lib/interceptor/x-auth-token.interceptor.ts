import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponseBase
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * xAuthToken拦截器
 */
export class XAuthTokenInterceptor implements HttpInterceptor {
  /**
   * 由缓存中获取token，防止页面刷新后失效
   */
  private static token = window.sessionStorage.getItem('x-auth-token');

  constructor() {
  }

  /**
   * 清空token
   */
  public static clearToken() {
    this.token = null;
    window.sessionStorage.removeItem('x-auth-token');
  }

  static getToken() {
    return this.token;
  }

  /**
   * 设置token
   * 如果接收到了新的token则更新，否则什么也不做
   * @param xAuthToken token
   */
  public static setToken(xAuthToken: string): void {
    if (this.token !== xAuthToken) {
      this.token = xAuthToken;
      window.sessionStorage.setItem('x-auth-token', this.token);
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.has('x-auth-token')) {
      XAuthTokenInterceptor.setToken(request.headers.get('x-auth-token'));
    } else if (XAuthTokenInterceptor.token !== null) {
      request = request.clone({setHeaders: {'x-auth-token': XAuthTokenInterceptor.token}});
    }
    return next.handle(request).pipe(tap(input => {
      // 仅当input类型为HttpResponseBase，才尝试获取token并更新
      if (input instanceof HttpResponseBase) {
        const httpHeader = input.headers;
        const xAuthToken = httpHeader.get('x-auth-token');
        if (xAuthToken !== null) {
          XAuthTokenInterceptor.setToken(xAuthToken);
        }
      }
    }));
  }
}
