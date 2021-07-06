import {
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpParams, HttpRequest, HttpResponseBase
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Type} from '@angular/core';
import {MockApiInterface} from './mock-api.interface';
import {isDefined, isNotNullOrUndefined} from './utils';
import {DelayHandlerInterface} from './delay-handler.interface';
import {RequestHandler, RequestMethodType} from './mock-api.types';

/**
 * 模拟API
 */
export class MockApiService {
  /**
   * 路由信息
   * Record<请求方法, Record<请求地址（正则表达式）, 回调函数<模拟返回的实体类型>>>
   */
  routers = {} as Record<RequestMethodType, Record<any, any | RequestHandler<any>>>;

  public static getMockApiService(mockObservable: DelayHandlerInterface): MockApiService {
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
  private constructor(private delayHandler: DelayHandlerInterface) {
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
    // 初化始信息
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

    // 根据请求参数类型,初始化请求基本信息
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

    // 根据请求数据,查找注册的API
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
            const message = 'yzMockApi Error: conflict, matched multiple routes';
            console.error(message, method, url, keys);
            return new Observable<HttpErrorResponse>(subscriber => {
              this.delayHandler.error(message, subscriber);
            });
          }
        }
      }
    }

    // 未找到API则报错
    if (keys.length === 0) {
      return new Observable<HttpErrorResponse>(subscriber => {
        const message = `yzMockApi Error: can't find mock result data:` +
          `1. pls make sure the request's url '${url}' and method '${method}' is right.` +
          `2. pls make sure your mockApi file has been added to the module HttpInterceptor.`;
        console.error(message);
        console.log('hello');
        this.delayHandler.error(message, subscriber);
      });
    }

    // requestHandler可能是回调,也可能是返回值.在此做类型的判断.
    let result = null as Observable<HttpEvent<R>> | R;
    if (typeof requestHandler === 'function') {
      requestHandler = requestHandler as RequestHandler<R>;
      result = requestHandler(urlMatches, options);
    } else {
      requestHandler = requestHandler as R;
      result = requestHandler;
    }

    // 按最终结果的类型分别返回
    if (result instanceof Observable) {
      return result;
    } else if (result instanceof HttpResponseBase) {
      return new Observable(ob => {
        ob.next(result);
        ob.complete();
      });
    } else {
      // 一般数据时加入延时
      return new Observable<HttpEvent<R>>(observable1 => {
        this.delayHandler.next(result, observable1);
      });
    }
  }
}
