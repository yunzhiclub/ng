import {MockHttpClientService} from '@yunzhi/ng-mock-http-client';
import {MockApiInterface} from '@yunzhi/ng-mock-http-client';
import {Subject} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {User} from './user';

export class UserApi implements MockApiInterface {
  injectMockHttpService(mockHttpService: MockHttpClientService): void {
    let subject = null as Subject<HttpResponse<User>>;
    mockHttpService.registerMockApi(
      'PUT',
      `^user/(\\d+)$`,
      () => {
        subject = new Subject<HttpResponse<User>>();
        return subject.asObservable();
      },
      (urlMatches, options, next) => {
        console.log(urlMatches);
        console.log(options);
        console.log(next);

        // 获取参数
        const id = +urlMatches[1];

        // 获取body
        const body = options.body as User;

        // 回传user
        const user = {id, name: 'admin'} as User;
        next(user, subject);
      }
    );
  }
}
