// 开发时请启用如下代码
// import {MockApiInterface} from '../../../mock-api/src/lib/mock-api.interface';
// 集成测试请启用如下代码
import {MockApiInterface} from '@yunzhi/ng-mock-api';
import {ApiInjector} from '../../../mock-api/src/lib/mock-api.types';
import {User} from './user';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

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
      new ApiInjector<string>({
        method: 'GET',
        url: `^user/getCurrentUsername$`,
        result: 'yunzhi'
      }),
      new ApiInjector<User>(
        {
          method: 'PUT',
          url: `^user/(\\d+)$`,
          handler: // handler为该接口对应返回的模块数据
            (delayNext, urlMatches, options) => {
              return new Observable<HttpResponse<User>>(observable => {
                // 用于延迟发送数据的delayNext
                console.log(delayNext);
                // 获取到的URL信息
                console.log(urlMatches);
                // 其它请求选项
                console.log(options);

                // 获取参数
                const id = +urlMatches[1];

                // 获取body
                const body = options.body as User;
                body.id = id;

                // 响应请求
                observable.next(new HttpResponse({body}));
                observable.complete();
              });
            }
        })
    ];
  }
}


