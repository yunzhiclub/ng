/**
 * 请求的5种类型
 */
import {Observable, Subject} from 'rxjs';
import {HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';

export  type RequestMethodType = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * 模拟请求.
 */
export type MockRequest<T> = {
  /**
   * 获取数据源.
   * @param delayNext 用于发送模拟延迟的数据
   * @param urlMatches URL匹配信息
   * @param options 其它请求选项
   */
  getObservable: (delayNext: (data: T, subject: Subject<HttpEvent<T>>) => void,
                  urlMatches: Array<string>,
                  options: {
                    body?: any;
                    headers?: HttpHeaders | {
                      [header: string]: string | string[];
                    };
                    reportProgress?: boolean;
                    observe: 'body' | 'events' | 'response';
                    params?: HttpParams | {
                      [param: string]: string | string[];
                    };
                    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
                    withCredentials?: boolean;
                  }) => Observable<HttpEvent<T>>
};
