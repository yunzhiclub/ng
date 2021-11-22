import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RouterStub} from './router.stub';
import {ActivatedRouteSnapshot, ActivationEnd, ParamMap, Params, Router} from '@angular/router';
import {Injectable} from '@angular/core';

/**
 * 路由测试桩
 */
@Injectable()
export class ActivatedRouteStub {
  paramMap: Observable<ParamMap>;
  paramMapSubject = new Subject<ParamMap>();
  params: Observable<Params>;
  paramsSubject = new Subject<Params>();
  queryParamMapSubject = new Subject<ParamMap>();
  queryParams: Observable<Params>;
  queryParamsMap: Observable<ParamMap>
  queryParamsSubject = new Subject<Params>();
  router: RouterStub;
  snapshot = {
    paramMap: {
      get: () => {
        return 0;
      }
    }
  };

  /**
   * 当有新路由参数时，弹出ActivationEnd事件，供在服务中通过Router获取全局路由信息
   * 比如：实现回退功能时，需要对每个路由信息进行缓存
   * @param router 路由
   */
  constructor(router: Router) {
    this.router = router as unknown as RouterStub;
    this.params = this.paramsSubject.asObservable();
    this.paramMap = this.paramMapSubject.asObservable();
    this.queryParams = this.queryParamsSubject.asObservable();
    this.paramsSubject.pipe(tap(params => {
      const activatedRouteSnapshot = new ActivatedRouteSnapshot();
      activatedRouteSnapshot.params = params;
      this.router.emitEvent(new ActivationEnd(activatedRouteSnapshot));
    })).subscribe();
    // 注册导航后的回调
    this.router.registerNavigateCallbackFn((queryParams: Params) => {
      this.queryParamsSubject.next(queryParams);
      this.paramsSubject.next(queryParams);
    });
  }
}

export class ParamMapImpl implements ParamMap {
  readonly values: { [key: string]: string | string[] };

  constructor(values: { [key: string]: string | string[] }) {
    this.keys = [];
    this.values = {};
    for (const key in values) {
      if (values[key] !== undefined) {
        const value = values[key];
        this.keys.push(key);
        this.values[key] = value;
      }
    }
  }

  get(name: string): string | null {
    return this.values[name] as string;
  }

  getAll(name: string): string[] {
    return this.values[name] as string[];
  }

  has(name: string): boolean {
    return this.keys.indexOf(name) >= 0;
  }

  readonly keys: string[];
}
