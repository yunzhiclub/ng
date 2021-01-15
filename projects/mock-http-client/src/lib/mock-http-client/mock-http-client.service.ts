import {
  HttpEvent,
  HttpHeaders,
  HttpParams, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Injectable, Type} from '@angular/core';
import {MockApiInterface} from './mock-api.interface';
import {MockObservable} from './mock-observable';
import {finalize, map} from 'rxjs/operators';
import {MockLoadingService} from './mock-loading.service';
import {isDefined, isNotNullOrUndefined} from '../utils';

/**
 * 模拟API
 */
@Injectable()
export class MockHttpClientService {
  /**
   * 模拟接口注册者
   * 在程序正式启动以前，所以的模拟接口都将注册到本属性中，供在构造函数中循环调用从而完成接口注册
   */
  static mockApiRegisters = [] as Array<Type<MockApiInterface>>;

  /**
   * 路由信息
   * Record<请求方法, Record<请求地址（正则表达式）, 回调函数<模拟返回的实体类型>>>
   */
  routers = {} as Record<RequestMethodType, Record<string, MockRequest<any>>>;

  /**
   * 注册模拟接口
   * @param clazz 接口类型
   */
  static registerMockApi(clazz: Type<MockApiInterface>): void {
    this.mockApiRegisters.push(clazz);
  }

  /**
   * 循环调用从而完成所有的接口注册
   */
  constructor(private mockObservable: MockObservable,
              private mockLoadingService: MockLoadingService,
              // @Inject(HTTP_INTERCEPTORS) private httpInterceptors: HttpInterceptor[]
  ) {
    MockHttpClientService.mockApiRegisters.forEach(api => {
      const instance = new api();
      instance.injectMockHttpService(this);
    });
  }

  /**
   * 注册模拟接口
   * @param url 请求地址
   * @param method 请求方法
   * @param getObservable 可观察者，用于接收数据
   * @param callback 回调
   */
  registerMockApi<T>(method: RequestMethodType,
                     url: string,
                     getObservable: () => Observable<HttpEvent<T>>,
                     callback: RequestCallback<T>): void {
    if (undefined === this.routers[method] || null === this.routers[method]) {
      this.routers[method] = {} as Record<string, MockRequest<T>>;
    }

    if (isNotNullOrUndefined(this.routers[method][url])) {
      throw Error(`在地址${url}已存在${method}的路由记录`);
    }

    this.routers[method][url] = {getObservable, callback};
  }

  delete<T>(url: string, options = {} as {
    headers?: HttpHeaders | { [p: string]: string | string[] };
    observe?: 'body';
    params?: HttpParams | { [p: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean
  }): Observable<T> {
    return this.request<T>('DELETE', url, {
      observe: 'body',
      responseType: 'json',
      headers: options.headers,
      params: options.params
    });
  }

  /**
   * get方法
   * @param url 请求地址
   * @param options 选项
   */
  get<T>(url: string, options = {} as {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  }): Observable<T> {
    return this.request<T>('GET', url, {
      observe: 'body',
      responseType: 'json',
      headers: options.headers,
      params: options.params
    });
  }

  /**
   * PATCH方法
   * @param url 请求地址
   * @param body 请求主体
   * @param options 请求选项
   */
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
    if (!isNotNullOrUndefined(options)) {
      options = {};
    }

    const nextOptions = options as {
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
    };

    nextOptions.body = body;
    return this.request<T>('PATCH', url, nextOptions);
  }

  post<T>(url: string, body: any, options: {
    headers?: HttpHeaders | { [p: string]: string | string[] };
    observe?: 'body';
    params?: HttpParams | { [p: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean
  }): Observable<T> {
    options = isDefined(options) ? options : {};
    const nextOptions = options as {
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
    };

    nextOptions.body = body;

    return this.request<T>('POST', url, nextOptions);
  }

  /**
   * PUT方法
   * @param url 请求地址
   * @param body 请求主体
   * @param options 请求选项
   */
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
    if (!isNotNullOrUndefined(options)) {
      options = {};
    }

    const nextOptions = options as {
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
    };

    nextOptions.body = body;
    return this.request<T>('PUT', url, nextOptions);
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
    let requestCallback = null as MockRequest<R>;
    let urlMatches = undefined as Array<string>;
    const urlRecord = this.routers[method] as Record<string, MockRequest<any>>;

    for (const key in urlRecord) {
      if (urlRecord.hasOwnProperty(key)) {
        const reg = new RegExp(key);
        if (reg.test(url)) {
          urlMatches = url.match(reg);
          requestCallback = urlRecord[key];
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

    const observable = requestCallback.getObservable();
    requestCallback.callback(urlMatches, options, this.mockObservable.next);

    // 返回数据前设置loading，以根据请求时间显示loading组件
    // this.mockLoadingService.sendLoading(true);
    return observable.pipe(map(data => {
      // 如果reportProgress，则为文件上传。否则暂时按HttpResponse处理
      // 否则将data原封不动的回传
      if (options.reportProgress === true) {
        return data;
      } else {
        data = data as HttpResponse<R>;
        return data.body;
      }
    }), finalize(() => {

    }));
  }
}

/**
 * 请求的5种类型
 */
type RequestMethodType = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * 1. 按使用正则match后的请求地址、方法匹配
 * 2. 匹配成功后，执行next发送数据
 * @param urlMatches 根据正则表达式格式化的url信息
 * @param options http请求选项
 * @param next 用于发送数据，在这本可以直接调用subject.next，多包裹一层的原因是由于考虑单元测试中使用cold()来模拟数据延迟
 */
type RequestCallback<T> = (urlMatches: Array<string>,
                           options: {
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
                           },
                           next: (data: T, subject: Subject<HttpEvent<T>>) => void)
  => void;

/**
 * 模拟请求
 * getObservable: 可观察数据源，观察其来得到响应数据
 * callback: 当检测到请求时，调用该回调函数来触发数据源发送数据
 */
type MockRequest<T> = {
  getObservable: () => Observable<HttpEvent<T>>,
  callback: RequestCallback<T>
};
