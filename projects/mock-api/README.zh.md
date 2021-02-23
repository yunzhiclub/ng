# Mock Api for Angular
Help you build example application without apis. Mock API calls while development, testing or building an example application. Define results based on url pattern and if needed http methods, and the mock of network delay is also provided. You can return HttpResponseBase or Observable or any data as you like.

> test passed for angular10.1.5, other versions not test yet.

more help please visit [https://github.com/yunzhiclub/ng/tree/main/projects/mock-api](https://github.com/yunzhiclub/ng/tree/main/projects/mock-api)

# Installation
```bash
npm install -s @yunzhi/ng-mock-api`
```

### Install Specific Version (Example: 0.0.1)
```bash
npm install -s @yunzhi/ng-mock-api@0.0.1`
```

# Usage
You can mock return any data, HttpEvent or Observable as you like.

1. New MockApi class with implements MockApiInterface
```typescript
export class UserApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
      return [];
  }
}
```
2. Add MockApiInterceptor.forRoot() or MockApiTestingInterceptor.forRoot to module and pass MockApi to forRoot function. Do not forget imports HttpClientModule.
```typescript
@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptor.forRoot([UserApi]),
      multi: true
    },
  ]
})
export class AppModule {}
```
3. Invoke httpClient for http request.
```typescript
public delete(id: number): void {
  this.httpClient.delete<void>('user/' + id.toString())
    .subscribe(() => console.log('success'));
}
```
4. Register injectores in MockApi's getInjectors() function.
```typescript
export class UserApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
    return [
      new ApiInjector<void>(
        {
          method: 'DELETE',
          url: 'user/(\\d+)'
        }
      )];
  }
}
```

* `method` support: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
* `url` is a string regular expression.

## return general data
The blow code will return HttpResponse<number> with 100.
```typescript
    return [
      new ApiInjector<number>(
        {
          method: 'GET',
          url: 'user/count',
          result: 100
        }
      )];
```

## return HttpResponseBase
You can return the HttpResponse.
```typescript
new ApiInjector<HttpResponse<User>>(
        {
          method: 'PUT',
          url: `user/(\\d+)`,
          handler:
            (urlMatches, options) => {
              const id = +urlMatches[1];
              const body = options.body as User;
              body.id = id;
              return new HttpResponse<User>({body});
            }
        })
```
> note: you must mock delay time by your-self.

## return Observable
You also can return Observable with any data, such as call error() when login fail.
```typescript
    new ApiInjector<Observable<HttpErrorResponse>>({
  method: 'GET',
  url: 'user/login',
  handler: (() => {
    return new Observable<HttpErrorResponse>(ob => {
      ob.error(new HttpErrorResponse({status: 401}));
      ob.complete();
    });
  })
})
```

> note: you must mock delay time by your-self.

## Get request info
You can get urlMatches with is the results of urlReg matching, and get full http request data in options. The urlMatches and options with pass to `handler`:
```typescript
        handler:
            (urlMatches, options) => {
              console.log(urlMatches);
              console.log(options);
            }
```

## Unit Testing
You can use MockApiTestingInterceptor instead of MockApiInterceptor, for example:
```typescript
 beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
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
```

Please not we imports the  HttpClientModule but not HttpClientTestingModule. And you can also use HttpClientTestingModule here, the MockApi with worked properly. 

Then you can use  `getTestScheduler().flush();` tick the time.

```typescript
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.ngOnInit();
  
    console.log('tick the time: flush data now');
    getTestScheduler().flush();
  
    fixture.detectChanges();
  });
```

# Others

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Code scaffolding

Run `ng generate component component-name --project mock-http-client` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project mock-http-client`.
> Note: Don't forget to add `--project mock-http-client` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build mock-http-client` to build the project. The build artifacts will be stored in the `dist/` directory.


## Before Publish
You should test the project before publish。
After building your library with `ng build mock-http-client --prod`, go to the dist folder `cd dist/mock-http-client` and run `npm link` for test。

Then go to test project add `@yunzhi/mock-http-client@version` to package.json，and run `npm link @yunzhi/mock-http-client`。

## Publishing

After building your library with `ng build mock-http-client --prod`, go to the dist folder `cd dist/mock-http-client` and run `npm link` for test , at last run `npm publish`.

## Running unit tests

Run `ng test mock-http-client` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help


To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
