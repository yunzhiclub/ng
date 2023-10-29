import {MockApiInterface} from 'packages/mock-api/src/public-api';
import {ApiInjector, RequestOptions} from 'packages/mock-api/src/public-api';
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
   */
  getInjectors(): ApiInjector[] {
    return [
      new ApiInjector(
        {
          method: 'DELETE',
          url: 'user/(\\d+)',
          description: '删除用户',
          result: new HttpResponse<void>()
        }
      ),
      new ApiInjector({
        method: 'GET',
        url: `user/getCurrentUsername`,
        result: 'yunzhi'
      }),
      new ApiInjector({
        method: 'GET',
        url: 'user/login',
        description: '用户登录',
        result: () => {
          return new Observable<HttpErrorResponse>(ob => {
            ob.error(new HttpErrorResponse({status: 401}));
            ob.complete();
          });
        }
      }),
      new ApiInjector (
        {
          method: 'PUT',
          url: `user/(\\d+)`,
          result:
            (urlMatches: string[], options: RequestOptions) => {
              const id = +urlMatches[1];
              const body = options.body as User;
              body.id = id;
              return new HttpResponse<User>({body});
            }
        })
    ];
  }
}


