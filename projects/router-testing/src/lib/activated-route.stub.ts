import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {RouterStub} from './router.stub';
import {ActivatedRouteSnapshot, ActivationEnd, ParamMap, Router} from '@angular/router';
import {isDefined} from '../../../mock-http-client/src/lib/utils';

/**
 * 路由测试桩
 */
@Injectable()
export class ActivatedRouteStub {
  router: RouterStub;
  paramsSubject = new Subject<any>();
  params: Observable<any>;
  paramMapSubject = new Subject<ParamMap>();
  paramMap: Observable<ParamMap>;
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
    this.paramsSubject.pipe(tap(params => {
      const activatedRouteSnapshot = new ActivatedRouteSnapshot();
      activatedRouteSnapshot.params = params;
      this.router.emitEvent(new ActivationEnd(activatedRouteSnapshot));
    })).subscribe();
  }
}

export class ParamMapImpl implements ParamMap {
  readonly keys: string[];
  readonly values: { [key: string]: string | string[] };

  get(name: string): string | null {
    return this.values[name] as string;
  }

  getAll(name: string): string[] {
    return this.values[name] as string[];
  }

  has(name: string): boolean {
    return this.keys.indexOf(name) >= 0;
  }

  constructor(values: { [key: string]: string | string[] }) {
    this.keys = [];
    this.values = {};
    for (const key in values) {
      if (isDefined(values[key])) {
        const value = values[key];
        this.keys.push(key);
        this.values[key] = value;
      }
    }
  }
}
