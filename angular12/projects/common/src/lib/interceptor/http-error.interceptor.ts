import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

/**
 * HTTP请求错误拦截器.
 */
export class HttpErrorInterceptor implements HttpInterceptor {
  public static phone = '13920618851';

  error = (url: string, message: string) => {
    console.warn(HttpErrorInterceptor.name + ': 请重写error方法以自定义错误');
    alert(url + ' ' + message);
  }

  goToLoginPath = () => {
    console.error(HttpErrorInterceptor.name + ': 请重写goToLoginPath方法以自定义跳转登录界面');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleHttpException(error);
      }));
  }

  /**
   * 处理异常
   * @param error 异常
   */
  private handleHttpException(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    let url = error.url;
    let message = error.status.toString();
    switch (error.status) {
      case 401:
        this.goToLoginPath();
        // 最终将异常抛出来，便于组件个性化处理
        return throwError(error);
      case 400:
        message = '非合理的请求参数';
        break;
      case 403:
        message = '您无此操作权限';
        break;
      case 404:
        message = '当前访问的地址不存在';
        break;
      case 405:
        message = '当前请求方法不允许';
        break;
      case 500:
        url += error.message + '。请联系开发者(微信同号)：' + HttpErrorInterceptor.phone;
        message = '发生逻辑错误';
        break;
      case 0:
        message = '未知网络错误';
        url += '。请联系开发者(微信同号)：' + HttpErrorInterceptor.phone;
        break;
      default:
        break;
    }
    this.error(url, message);

    // 最终将异常抛出来，便于组件个性化处理
    return throwError(error);
  }
}
