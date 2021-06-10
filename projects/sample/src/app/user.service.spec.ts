import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {UserApi} from './user.api';
import {getTestScheduler} from 'jasmine-marbles';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: MockApiInterceptor.forRoot([UserApi]),
        }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('error', () => {
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
