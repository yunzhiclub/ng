import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {User} from './user';
// 开发时请启用如下代码
// import {MockApiInterface} from '../../../mock-api/src/lib/mock-api.interface';
// import {MockApiService} from '../../../mock-api/src/lib/mock-api.service';
// 集成测试请启用如下代码
import {MockApiService, MockApiInterface} from '@yunzhi/ng-mock-api';

export class UserApi implements MockApiInterface {
  injectMockHttpService(mockHttpService: MockApiService): void {
    console.log('regsiter');
    mockHttpService.registerMockApi<User>('PUT', `^user/(\\d+)$`,
      (next, urlMatches, options) => {
        return new Observable<HttpResponse<User>>(observable1 => {
          console.log(urlMatches);
          console.log(options);
          console.log(next);

          // 获取参数
          const id = +urlMatches[1];

          // 获取body
          const body = options.body as User;
          body.id = id;

          observable1.next(new HttpResponse({body}));
          observable1.complete();
        });
      });
  }
}
