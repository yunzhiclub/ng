import {BasicService} from '../../theme/src/basic/service/basic.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {randomString} from '../../../../utils';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BasicService {

  /**
   * 标题
   */
  getTitle(): Observable<string> {
    return new Observable<string>(subscriber => {
      subscriber.next('标题重写测试');
      setInterval(() => subscriber.next(randomString('标题重写测试')),
        2000);
    });
  }

  /**
   * 注销
   */
  logout(): void {
    console.info('重写logout()实现注销');
  }
}
