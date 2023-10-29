# Yunzhi NgMockApi

An embedded mock REST service for Angular development and Unit test. 

## install

```shell
$ npm install -s @yunzhi/ng-mock-api
```

## Quick Start


1. Create a mock api file, for example: `user.api`

```typescript
import {MockApiInterface, ApiInjector, RequestOptions} from '@yunzhi/ng-mock-api'
import {Observable} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

/**
 * The mock api for user REST
 * class UserApi should implements MockApiInterface
 */
export class UserApi implements MockApiInterface {

  /**
   * implement getInjectors() function and return ApiInjector Array.
   */
  getInjectors(): ApiInjector[] {
    return [
      new ApiInjector(
        {
          method: 'DELETE',
          url: 'user/:id',
          description: 'delete user with id',
          // when result type is HttpResponse, the NgMockApi will return the HttpResponse immediate.
          result: new HttpResponse<void>()
        }
      ),
      new ApiInjector({
        method: 'GET',
        url: `user/getCurrentUsername`,
        // when result type is string | number | Object | ... the NgMockApi will return a HttpResponse which contains the result with a 0.5S - 3.0S's delay. 
        result: 'yunzhi'
      }),
      new ApiInjector({
        method: 'GET',
        url: 'user/login',
        description: '用户登录',
        // the result type is also can be function
        result: () => {
          // can return an Observable<HttpErrorResponse> in the function. 
          return new Observable<HttpErrorResponse>(ob => {
            ob.error(new HttpErrorResponse({status: 401}));
            ob.complete();
          });
        }
      }),
      new ApiInjector (
        {
          method: 'PUT',
          url: `user/:id`,
          // can set params with result's function, the first params type is `{[key: string]: string}`, and the second is RequestOptions. 
          result: (params: {id: string}, options: RequestOptions) => {
              const id = +params.id;          // get path param with params.
              const body = options.body;      // get request body with options.
              body.id = id;
              return new HttpResponse<any>({body});  // can return body directly also.
            }
        })
    ];
  }
}
```

### Development
2. Set UserApi to MockApiInterceptor

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {UserApi} from './user.api';

// init apis with UserMockApi
export const apis = [UserApi];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptor.forRoot(apis),
      multi: true
    }
  ]
})
export class ApiModule { }
```

Filter request:

```typescript
useClass: MockApiInterceptor.forRoot(apis, {
   // only enable Interceptor when url not startsWith 'assets'
  filter: (req: HttpRequest<any>) => !req.url.startsWith('assets')
})
```

3. Use HttpClient for http request:

```typescript
  // get current user name
  this.httpClient.get<string>(`user/getCurrentUsername`)
    .subscribe(username => {
      console.log(username);
    });
```

### Unit Test
2. Set UserApi to DynamicTestingModule

```typescript

@Component({
  template: '<h1>hello {{username}}</h1>'
})
class AppComponent implements OnInit {
  username = '';
  
  constructor(private httpClient: HttpClient) {
  }
  
  ngOnInit(): void { 
    this.httpClient.get<string>(`user/getCurrentUsername`)
      .subscribe(username => this.username = username);
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        // action: Use the HttpClientModule but not HttpClientTestingModule
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockApiTestingInterceptor
            .forRoot([UserApi]),
          multi: true
        },
      ]
    }).compileComponents();
  });

  it('should render title', () => {
    // 初始化组件，并手动调用ngOnInit()方法
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.username).toEqual('');
    console.log('flush data by hand');
    getTestScheduler().flush();
    console.log('The mock api data will return immediate');
    expect(app.username).toEqual('yunzhi');
  });
});
```

