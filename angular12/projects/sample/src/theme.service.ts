import {BasicService} from '../../theme/src/basic/service/basic.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BasicService {

  /**
   * 标题
   */
  getTitle(): string {
    return '标题重写测试';
  }

  /**
   * 注销
   */
  logout(): void {
    console.info('重写logout()实现注销');
  }
}
