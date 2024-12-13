import {Observable} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ApiInjector, MockApiInterface, RequestOptions} from 'packages/mock-api/src/public-api';

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
          url: 'user/:id',
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
        url: `user/:id`,
        result: (params: {id: string}) => {
          return {id: +params.id};
        }
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
      new ApiInjector(
        {
          method: 'PUT',
          url: `user/:id`,
          result:
            (params: {id: string}, options: RequestOptions) => {
              const id = +params.id;
              const body = options.body;
              body.id = id;
              return new HttpResponse<any>({body});
            }
        })
    ];
  }
}


