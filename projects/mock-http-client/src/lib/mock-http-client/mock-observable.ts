import {Injectable} from '@angular/core';
import {of, Subject} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {MockObservableInterface} from './mock-observable.interface';
import {isNullOrUndefined, randomNumber} from '../utils';

@Injectable()
export class MockObservable implements MockObservableInterface {

  constructor() {
  }

  /**
   * 使用随机的延时返回数据
   * @param subject 数据源
   */
  next<T>(data: T, subject: Subject<HttpResponse<T>>): void {
    const delayCount = randomNumber() % 6;
    of(new HttpResponse({body: data})).pipe(delay(delayCount * delayCount * 100))
      .subscribe(t => {
        isNullOrUndefined(t) ? subject.next() : subject.next(t);
        subject.complete();
      });
  }
}
