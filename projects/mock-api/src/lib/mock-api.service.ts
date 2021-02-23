import {
  HttpEvent,
  HttpHeaders,
  HttpParams, HttpRequest, HttpResponseBase
} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {Type} from '@angular/core';
import {MockApiInterface} from './mock-api.interface';
import {isDefined, isNotNullOrUndefined} from './utils';
import {MockObservableInterface} from './mock-observable.interface';
import {RequestHandler, RequestMethodType} from './mock-api.types';
import {MockObservable} from './mock-observable';

/**
 * 模拟API
 */
export class MockApiService {
  /**
   * 路由信息
   * Record<请求方法, Record<请求地址（正则表达式）, 回调函数<模拟返回的实体类型>>>
   */
  routers = {} as Record<RequestMethodType, Record<any, any | RequestHandler<any>>>;

  public static getMockApiService(mockObservable: MockObservableInterface): MockApiService {
    return new MockApiService(mockObservable);
  }


  /**
   * 注册模拟接口
   * @param classes 接口类型
   */
  registerMockApis(classes: Type<MockApiInterface>[]): void {
    classes.forEach(clazz => {
      const instance = new clazz();
      const injectors = instance.getInjectors();
      injectors.forEach(injector => {
        let handlerOrResult = null;
        if (isDefined(injector.result)) {
          handlerOrResult = injector.result;
        } else if (isDefined(injector.handler)) {
          handlerOrResult = injector.handler;
        }
        this.registerMockApi(injector.method, injector.url, handlerOrResult);
      });
    });
  }

  /**
   * 循环调用从而完成所有的接口注册
   */
  private constructor(private mockObservable: MockObservable) {
  }

  /**
   * 注册模拟接口
   * @param method 请求方法
   * @param url 请求地址
   * @param handler 获取数据源方法
   */
  registerMockApi<T>(method: RequestMethodType,
                     url: string,
                     handlerOrResult: T | RequestHandler<T>): void {
    if (undefined === this.routers[method] || null === this.routers[method]) {
      this.routers[method] = {} as Record<string, RequestHandler<T>>;
    }

    if (isNotNullOrUndefined(this.routers[method][url])) {
      throw Error(`在地址${url}已存在${method}的路由记录`);
    }

    this.routers[method][url] = handlerOrResult;
  }

  request<R>(request: HttpRequest<any>): Observable<HttpEvent<R>>;
  /**
   * 所有的GET\POST\DELETE\PUT\PATCH方法最终均调用request方法。
   * 如果当前request不能够满足需求，则请移步angular官方提供的HttpClient
   *
   * 该方法先根据method进行匹配，接着根据URL进行正则表达式的匹配。
   * 匹配成功后将参数传入接口并获取模拟接口的返回值
   *
   * @param method 请求方法
   * @param url 请求地址
   * @param options 选项
   */
  request<R>(method: string, url: string, options: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    reportProgress?: boolean;
    observe: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<R>;
  request<R>(arg0: any, ...args: any[]): any {
    let url: string;
    let options: {
      body?: any;
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      reportProgress?: boolean;
      observe: 'body';
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    };
    let method: string;

    if (arg0 instanceof HttpRequest) {
      method = arg0.method.toUpperCase();
      url = arg0.url;
      options = {
        body: arg0.body,
        headers: arg0.headers,
        reportProgress: arg0.reportProgress,
        observe: 'body',
        params: arg0.params,
        responseType: arg0.responseType,
        withCredentials: arg0.withCredentials
      };
    } else {
      method = arg0;
      url = args[0];
      options = args[1];
    }

    const keys = [];
    let requestHandler = null as RequestHandler<R> | R;
    let urlMatches = undefined as Array<string>;
    const urlRecord = this.routers[method] as Record<string, RequestHandler<R>>;

    for (const key in urlRecord) {
      if (urlRecord.hasOwnProperty(key)) {
        const reg = new RegExp(`^${key}$`);
        if (reg.test(url)) {
          urlMatches = url.match(reg);
          requestHandler = urlRecord[key];
          keys.push(key);
          if (keys.length > 1) {
            const message = '匹配到了多个URL信息，请检定注入服务的URL信息，URL信息中存在匹配冲突';
            console.error(message, method, url, keys);
            throw Error(message);
          }
        }
      }
    }

    if (keys.length === 0) {
      throw Error(`未找到对应的模拟返回数据：1. 请检查url、method是否正确 ${method}, ${url}；
    2. 请确认调用了MockHttpClientService.registerMockApi(你的mockApi文件)`);
    }

    // requestHandler可能是回调,也可能是返回值.在此做类型的判断.
    let result = null as Observable<HttpEvent<R>> | R;
    if (typeof requestHandler === 'function') {
      requestHandler = requestHandler as RequestHandler<R>;
      result = requestHandler(this.mockObservable.next, urlMatches, options);
    } else {
      requestHandler = requestHandler as R;
      result = requestHandler;
    }

    // 按最终结果的类型分别返回
    if (result instanceof Observable) {
      return result;
    } else {
      return new Observable<HttpEvent<R>>(observable1 => {
        this.mockObservable.next(result, observable1);
      });
    }
  }
}
