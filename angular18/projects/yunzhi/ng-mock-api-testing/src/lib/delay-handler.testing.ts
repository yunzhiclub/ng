import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {cold} from 'jasmine-marbles';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Subscriber} from 'rxjs/internal/Subscriber';
import { DelayHandlerInterface } from '../../../ng-mock-api/src/public-api';

/**
 * 测试时用于模拟delay.
 */
export class DelayHandlerTesting implements DelayHandlerInterface {

  constructor() {
  }

  /**
   * 发生网络错误
   * @param message 错误消息
   * @param subscriber 消息推送者
   */
  error(message: any, subscriber: Subscriber<HttpErrorResponse>): void {
    this.randomDelayCallback(() => {
      subscriber.error(new HttpErrorResponse({
        status: 0,
        error: message,
        statusText: 'network error'
      }));
      subscriber.complete();
    });
  }

  /**
   * 返回供测试用的观察者
   * 如果当前为测试过程中，则调用cold方法返回观察者将不出抛出异常。
   * 否则使用of方法返回观察者
   * @param data 返回的数据
   * @param subject 可供继续发送数据的数据源
   */
  next<T>(data: T, subject: Subscriber<HttpResponse<T>>): void {
    this.randomDelayCallback(() => {
      !!data ? subject.next(new HttpResponse({body: data})) : subject.next(new HttpResponse());
      subject.complete();
    });
  }

  /**
   * 随机延迟回调
   * @param callbackFn 回调函数
   */
  private randomDelayCallback(callbackFn: () => void): void {
    const delayCount =  Math.floor(Math.random() * 1000) % 6;
    try {
      let interval = '';
      for (let i = 0; i < delayCount; i++) {
        interval += '---';
      }
      cold(interval + '(x|)', {x: undefined})
        .subscribe(() => {
          callbackFn();
        });
    } catch (e) {
      // @ts-ignore
      if (e.message === 'No test scheduler initialized') {
        of(null).pipe(delay(delayCount * delayCount * 100))
          .subscribe(() => {
            callbackFn();
          });
      } else {
        throw e;
      }
    }
  }
}
