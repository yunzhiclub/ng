import {of, Subject} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpEvent, HttpResponse} from '@angular/common/http';
import {MockObservableInterface} from './mock-observable.interface';
import {isNullOrUndefined, randomNumber} from './utils';
import {Subscriber} from 'rxjs/internal/Subscriber';

export class MockObservable implements MockObservableInterface {

  constructor() {
  }

  /**
   * 使用随机的延时返回数据
   * @param subject 数据源
   */
  next<T>(data: T, subject: Subscriber<HttpEvent<T>>): void {
    const delayCount = randomNumber() % 6;
    of(new HttpResponse({body: data}))
      .pipe(delay(delayCount * delayCount * 100))
      .subscribe(t => {
        isNullOrUndefined(t)
          ? subject.next()
          : subject.next(t);
        subject.complete();
      });
  }
}
