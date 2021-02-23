import {of, Subject} from 'rxjs';
import {delay} from 'rxjs/operators';
import {cold} from 'jasmine-marbles';
import {HttpResponse} from '@angular/common/http';
import {randomNumber, isNullOrUndefined} from '../utils-test';
// 集成测试请启用如下代码
import {MockObservableInterface} from '@yunzhi/ng-mock-api';
// 开发时请启用如下代码
// import {MockObservableInterface} from '../../../src/lib/mock-observable.interface';


export class MockTestingObservable implements MockObservableInterface {

  constructor() {
  }

  /**
   * 返回供测试用的观察者
   * 如果当前为测试过程中，则调用cold方法返回观察者将不出抛出异常。
   * 否则使用of方法返回观察者
   * @param data 返回的数据
   * @param subject 可供继续发送数据的数据源
   */
  next<T>(data: T, subject: Subject<HttpResponse<T>>): void {
    const delayCount = randomNumber() % 6;
    try {
      let interval = '';
      for (let i = 0; i < delayCount; i++) {
        interval += '---';
      }
      cold(interval + '(x|)', {x: data === undefined ? new HttpResponse() : new HttpResponse({body: data})})
        .subscribe(t => {
          subject.next(t);
          subject.complete();
        });
    } catch (e) {
      if (e.message === 'No test scheduler initialized') {
        of(data).pipe(delay(delayCount * delayCount * 100))
          .subscribe(t => {
            isNullOrUndefined(t) ? subject.next(new HttpResponse()) : subject.next(new HttpResponse({body: t}));
            subject.complete();
          });
      } else {
        throw e;
      }
    }
  }
}
