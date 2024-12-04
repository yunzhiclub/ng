import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpErrorResponse, HttpEvent, HttpResponse} from '@angular/common/http';
import {DelayHandlerInterface} from './delay-handler.interface';
import {randomNumber} from './utils';
import {Subscriber} from 'rxjs/internal/Subscriber';

/**
 * 延时处理器.
 */
export class DelayHandler implements DelayHandlerInterface {

  constructor() {
  }

  /**
   * 发生错误时延时调用error方法
   * @param message 错误信息
   * @param subscriber 订阅者
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
   * 使用随机的延时返回数据
   * @param data 数据
   * @param subscriber 订阅者
   */
  next<T>(data: T, subscriber: Subscriber<HttpEvent<T>>): void {
    this.randomDelayCallback(() => {
      subscriber.next(new HttpResponse({body: data}));
      subscriber.complete();
    });
  }

  private randomDelayCallback(callbackFn: () => void): void {
    of(null).pipe(delay(randomNumber() % 6 * 100)).subscribe(() => {
      callbackFn();
    });
  }
}
