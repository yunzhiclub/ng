import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpEvent, HttpResponse} from '@angular/common/http';
import {DelayHandlerInterface} from './delay-handler.interface';
import {isNullOrUndefined, randomNumber} from './utils';
import {Subscriber} from 'rxjs/internal/Subscriber';

/**
 * 延时处理器.
 */
export class DelayHandler implements DelayHandlerInterface {

  constructor() {
  }

  /**
   * 使用随机的延时返回数据
   * @param subscriber 订阅者
   */
  next<T>(data: T, subscriber: Subscriber<HttpEvent<T>>): void {
    const delayCount = randomNumber() % 6;
    of(new HttpResponse({body: data}))
      .pipe(delay(delayCount * delayCount * 100))
      .subscribe(t => {
        isNullOrUndefined(t)
          ? subscriber.next()
          : subscriber.next(t);
        subscriber.complete();
      });
  }
}
