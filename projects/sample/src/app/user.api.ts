// 开发时请启用如下代码
// import {MockApiInterface} from '../../../mock-api/src/lib/mock-api.interface';
// 集成测试请启用如下代码
import {MockApiInterface} from '@yunzhi/ng-mock-api';
import {ApiInjector} from '../../../mock-api/src/lib/mock-api.types';
import {User} from './user';
import {Observable} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

/**
 * user模拟接口.
 * 必须实现MockApiInterface接口
 */
export class UserApi implements MockApiInterface {

  /**
   * 实现接口MockApiInterface中的injectMockHttpService方法
   * @param mockApiService 模拟API服务
   *
   */
  getInjectors(): ApiInjector<any>[] {
    return [
      new ApiInjector<HttpResponse<void>>(
        {
          method: 'DELETE',
          url: 'user/(\\d+)',
          result: new HttpResponse<void>()
        }
      ),
      new ApiInjector<string>({
        method: 'GET',
        url: `user/getCurrentUsername`,
        result: 'yunzhi'
      }),
      new ApiInjector<Observable<HttpErrorResponse>>({
        method: 'GET',
        url: 'user/login',
        handler: ((urlMatches, options) => {
          return new Observable<HttpErrorResponse>(ob => {
            ob.error(new HttpErrorResponse({status: 401}));
            ob.complete();
          });
        })
      }),
      new ApiInjector<HttpResponse<User>>(
        {
          method: 'PUT',
          url: `user/(\\d+)`,
          handler:
            (urlMatches, options) => {
              const id = +urlMatches[1];
              const body = options.body as User;
              body.id = id;
              return new HttpResponse<User>({body});
            }
        })
    ];
  }
}


