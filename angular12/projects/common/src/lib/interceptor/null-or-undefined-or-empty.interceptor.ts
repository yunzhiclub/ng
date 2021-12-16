import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {YzHttpParams} from '../model/yz-http-params';

/**
 * 过滤掉params中的null或undefined或空字符串
 */
export class NullOrUndefinedOrEmptyInterceptor implements HttpInterceptor {
  /**
   * 获取去除NaN undefined null之后的其它参数
   * @param params 参数
   */
  public static getCleanedParams(params: HttpParams): HttpParams {
    let cleanedParams = new HttpParams();
    params.keys().forEach(x => {
      const value = params.get(x);
      if (isNotNullOrUndefined(value) && value!.length > 0 && value !== 'NaN' && value !== 'undefined' && value !== 'null') {
        cleanedParams = cleanedParams.append(x, params.get(x)!);
      }
    });
    return cleanedParams;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * 过滤到null及undefined
     */
    let cleanedParams = new HttpParams();
    const params = request.params;
    if (params instanceof YzHttpParams) {
      // 过滤原值
      params.keys().forEach(x => {
        if (isNotNullOrUndefinedOrNaN(params.getOrigin(x))) {
          cleanedParams = cleanedParams.append(x, request.params.get(x)!);
        }
      });
    } else {
      // 过滤字符串格式的值
      request.params.keys().forEach(x => {
        if (isNotNullOrUndefined(request.params.get(x)) && request.params.get(x)!.length > 0) {
          cleanedParams = cleanedParams.append(x, request.params.get(x)!);
        }
      });
    }

    request = request.clone({params: cleanedParams});
    return next.handle(request);
  }
}

/**
 * 不是null也不是undefined
 * @param s 传入参数
 */
const isNotNullOrUndefined = (s: string | null): boolean => {
  return !(s === null || s === 'null' || s === 'undefined');

}

/**
 * 不是null,undefined,NaN
 * @param s
 */
const isNotNullOrUndefinedOrNaN = (s: string | number | boolean | null | undefined): boolean => {
  return !(s === null || typeof s === 'undefined' || Number.isNaN(s));
}
