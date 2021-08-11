import {Observable} from 'rxjs';
import {HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';

/**
 * 请求的5种类型
 */
export  type RequestMethodType = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * 请求处理器.
 * @param delayNext 用于发送模拟延迟的数据
 * @param urlMatches URL匹配信息
 * @param options 其它请求选项
 */
export type RequestHandler<T>
  = (urlMatches: Array<string>,
     options: RequestOptions) => Observable<HttpEvent<T>> | T;
/**
 * 请求选项
 */
export type RequestOptions = {
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
};

/**
 * 此文中Benson对构造函数的重载回答的真好!
 * https://www.itranslater.com/qa/details/2109909368035607552
 */
export class ApiInjector {
  method?: RequestMethodType;
  /**
   * 请求地址
   */
  url: string;
  /**
   * 对当前接口的描述
   */
  description?: string;
  /**
   * 返回结果,优先获取
   */
  result: any | RequestHandler<any>;

  constructor(obj: ApiInjector = {} as ApiInjector) {
    this.method = obj.method;
    this.url = obj.url;
    this.description = obj.description;
    this.result = obj.result;
  }
}
