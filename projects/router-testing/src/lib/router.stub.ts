import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  ActivatedRoute,
  Event,
  NavigationExtras,
  Params,
  QueryParamsHandling,
  UrlTree
} from '@angular/router';

@Injectable()
export class RouterStub {
  /**
   * An event stream for routing events in this NgModule.
   */
  readonly events: Observable<Event>;
  /**
   * 事件源
   */
  private readonly eventsSubject = new Subject<Event>();

  constructor() {
    this.events = this.eventsSubject.asObservable();
  }

  /**
   * 增加该函数的目的仅为满足Ionic对route-link指令的处理
   * @param commands 未知
   * @param navigationExtras 未知
   */
  createUrlTree(commands: any[], navigationExtras: UrlCreationOptions = {}): UrlTree {
    return {
      root: null,
      queryParams: null,
      fragment: null,
      queryParamMap: null,
      toString(): string {
        return '';
      }
    };
  }

  /**
   * 弹出新事件
   * @param event 事件
   */
  emitEvent(event: Event): void {
    this.eventsSubject.next(event);
  }

  navigateByUrl(url: string | UrlTree, extras?: NavigationExtras): Promise<boolean> {
    console.log('接收到了跳转请求', url, extras);
    return Promise.resolve(true);
  }

  /**
   * 跳转
   * @param commands 参数
   * @param extras 扩展属性
   */
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return Promise.resolve(true);
  }

  /**
   * 增加该函数的目的仅为满足Ionic对route-link指令的处理
   * @param url 未知
   */
  serializeUrl(url: UrlTree): string {
    return '';
  }
}

interface UrlCreationOptions {
  relativeTo?: ActivatedRoute | null;
  queryParams?: Params | null;
  fragment?: string;
  queryParamsHandling?: QueryParamsHandling | null;
  preserveFragment?: boolean;
}

