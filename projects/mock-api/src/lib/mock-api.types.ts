/**
 * 请求的5种类型
 */
import {Observable} from 'rxjs';
import {HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subscriber} from 'rxjs/internal/Subscriber';

export  type RequestMethodType = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * 请求处理器.
 * @param delayNext 用于发送模拟延迟的数据
 * @param urlMatches URL匹配信息
 * @param options 其它请求选项
 */
export type RequestHandler<T>
  = (delayNext?: (data: T, subject: Subscriber<HttpEvent<T>>) => void,
     urlMatches?: Array<string>,
     options?: {
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
     }) => Observable<HttpEvent<T>> | T;

/**
 * 此文中Benson对构造函数的重载回答的真好!
 * https://www.itranslater.com/qa/details/2109909368035607552
 */
export class ApiInjector<T> {
  method: RequestMethodType;
  url: string;
  result?: T;
  handler?: RequestHandler<T>;

  constructor(obj: ApiInjector<T> = {} as ApiInjector<T>) {
    this.method = obj.method;
    this.url = obj.url;
    this.result = obj.result;
    this.handler = obj.handler;
  }
}
