import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserApi} from './user.api';
import {getTestScheduler} from 'jasmine-marbles';
import {MockApiTestingInterceptor} from 'packages/mock-api/testing/src/public-api';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: MockApiTestingInterceptor.forRoot([UserApi]),
        }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * 测试网络错误时延时返回异常
   */
  it('error', () => {
    getTestScheduler().flush();
    let called = false;
    service.error().subscribe(() => {}, (error) => {
      called = true;
      console.log(error);
    });
    expect(called).toBeFalse();

    getTestScheduler().flush();
    expect(called).toBeTrue();
  });
});
