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
        result: 'mock user'
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
              return new HttpResponse<any>({body});  
              // can return body directly also.
              // return body;
            }
        })
    ];
  }
}
```

### Development
2. Set UserApi to MockApiInterceptor.forRoot function, and set HTTP_INTERCEPTORS

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor.forRoot([UserApi]), multi: true
    }
  ]
};
```

Filter request example:

```typescript
useClass: MockApiInterceptor.forRoot([UserApi], {
   // only enable Interceptor when url not startsWith 'assets'
  filter: (req: HttpRequest<any>) => !req.url.startsWith('assets')
})
```

3. Use HttpClient for http request:

```typescript
  // get current user name
  this.httpClient.get<string>(`user/getCurrentUsername`)
    .subscribe(user => {
      console.log(user);
    });
```

## unit test

[https://www.npmjs.com/package/@yunzhi/ng-mock-api-testing](https://www.npmjs.com/package/@yunzhi/ng-mock-api-testing)


## dev

```shell
nvm use 20
ng build mock-api
cd ../../dist/mock-api
npm login
npm publish
```
