import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {User} from './user';
import {MockApiInterface} from '../../../mock-http-client/src/lib/mock-api.interface';
import {MockApiService} from '../../../mock-http-client/src/lib/mock-api.service';

export class UserApi implements MockApiInterface {
  injectMockHttpService(mockHttpService: MockApiService): void {
    mockHttpService.registerMockApi(
      'PUT',
      `^user/(\\d+)$`,
      (urlMatches, options, next) => {
        return new Observable<HttpResponse<User>>(observable1 => {
          console.log(urlMatches);
          console.log(options);
          console.log(next);

          // 获取参数
          const id = +urlMatches[1];

          // 获取body
          const body = options.body as User;

          // 回传user
          const user = {id, name: 'admin'} as User;
          observable1.next(new HttpResponse({body: user}));
          observable1.complete();
        });
      }
    );
  }
}
