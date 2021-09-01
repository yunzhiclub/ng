import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  private static handleHttpException(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    console.log('发生网络异常，被成功拦截', error);
    // 最终将异常抛出来，便于组件个性化处理
    return throwError(error);
  }

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          AppInterceptor.handleHttpException(error)),
        finalize(() => console.log('loading end')));
  }
}
