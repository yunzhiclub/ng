import {BasicService} from 'packages/theme/src/public-api';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {randomString} from '@yunzhi/utils';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BasicService {

  /**
   * 标题
   */
  override getTitle(): Observable<string> {
    return new Observable<string>(subscriber => {
      subscriber.next('标题重写测试');
      setInterval(() => subscriber.next(randomString('标题重写测试')),
        2000);
    });
  }

  /**
   * 注销
   */
  override logout(): void {
    console.info('重写logout()实现注销');
  }
}
