# Mock Api for Angular
Help you build example application without apis. Mock API calls while development, testing or building an example application. Define results based on url pattern and if needed http methods, and the mock of network delay is also provided. You can return HttpResponseBase or Observable or any data as you like.

> test passed for angular10.1.5, 10.1.6, 11.1, 12.1, 12.2.

| ng-mock-api version | angular version | 

more help please visit [https://github.com/yunzhiclub/ng/tree/main/projects/mock-api](https://github.com/yunzhiclub/ng/tree/main/projects/mock-api)

# Installation
```bash
npm install -s @yunzhi/ng-mock-api
```

### Install Specific Version (Example: 0.0.7)
```bash
npm install -s @yunzhi/ng-mock-api@0.0.7
```

# Usage
You can mock return any data, HttpEvent or Observable as you like.
1. for example, you have a delete method as blew:
```typescript
public delete(id: number): void {
  this.httpClient.delete<void>('user/' + id.toString())
    .subscribe(() => console.log('success'));
}
```
And then, you can mock the delete method step by step:

2. create New MockApi class which implements the MockApiInterface interface, and add result of api by method and url pattern.
```typescript
export class UserApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
      return [
        new ApiInjector<void>(
                {
                  method: 'DELETE',
                  url: 'user/(\\d+)'
                }
              )
      ];
  }
}
```


3. Add MockApiTestingInterceptor.forRoot() to testing module and pass UserApi to forRoot function. Do not forget imports HttpClientModule.
```typescript
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: MockApiTestingInterceptor.forRoot([UserApi]),
            multi: true
          },
        ]
    }).compileComponents();
  });
```
And now the delete method which is declared on step 1 can be called successful.

If you need make a demo with MockApi, replace MockApiTestingInterceptor.forRoot() with MockApiInterceptor.forRoot() and move the provider to RootModule's (for example: AppModule) @NgModule.

```typescript
@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiTestingInterceptor.forRoot([UserApi]),
      multi: true
    },
  ]
})
export class AppModule {}
```


* `method` support: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
* `url` is a string regular expression.

## filter req
If you don't want handler some req with actual http request when use MockApi, you can password filter to `forRoot` method, for example: req with actual http request with req.url is begin with icon: 

```typescript
@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiTestingInterceptor.forRoot([UserApi], {filter: (req)}),
      multi: true
    },
  ]
})
export class AppModule {}
```

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

You can also return any object as you like:

```typescript
    return [
      new ApiInjector<number>(
        {
          method: 'GET',
          url: 'user/1',
          result: {id: 1, name: 'foo'}
        }
      )];
```

And then the httpClient with request successful with a random delay time.

## return HttpResponseBase
You can return the HttpResponse too.
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

> note: The random delay will invalid when return HttpResponse, so you must mock delay time by your-self if you need.

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

> note: The random delay will invalid when return HttpErrorResponse, so you must mock delay time by your-self if you need.

## Get request info
You can get urlMatches with is the results of urlReg matching, and get full http request data in options. The urlMatches and options with pass to `handler`:
```typescript
        handler:
            (urlMatches: string[], options) => {
              console.log(urlMatches);
              console.log(options);
            }
```

## Unit Testing
You can use MockApiTestingInterceptor or MockApiInterceptor in Unit test:
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

Please note we imports the  HttpClientModule but not HttpClientTestingModule. And you can also use HttpClientTestingModule here, the MockApi with worked properly.

If MockApiTestingInterceptor be used, then you can use  `getTestScheduler().flush();` to tick the time.

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

Run `ng build mock-api` to build the project. The build artifacts will be stored in the `dist/` directory.


## Before Publish
You should test the project before publish。
After building your library with `ng build mock-api --prod`, go to the project root folder run `cd dist/mock-api` and then run `npm link` for test。

Then go to test project add `@yunzhi/ng-mock-api@version` to package.json，and run `npm link @yunzhi/ng-mock-api`。

## Publishing

After building your library with `ng build mock-api --prod`, go to the dist folder `cd dist/mock-api` and run `npm link` for test , at last run `npm publish`.
If MockApiInterceptor be used, you can't tick the time anymore.

summary:
1. You should use MockApiTestingInterceptor for unit testing. 
2. You should use MockApiInterceptor for a dome with Mock Apis.
