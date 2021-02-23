提供MockHttpClient，模似网络延迟。可在开发测试过程中替换原HttpClient，在不依赖于后台或其它API应用的前提下进行前台的独立开发。采用文件中自定义返回数据的方式，可脱离前后台接口文档，轻松完成前后台接口统一。

> 在angular10.1.5上应用测试通过，其它版本未测试。

更多帮助文档请点击[github]()

# 使用方法
`npm i @yunzhi/ng-mock-api`

更详细的使用请参考项目github中的示例代码。

假设前台依赖于更新用户的`put user`接口：
``` typescript
  public updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`user/${id}`, user);
  }
```

则可以建立模拟后台接口文件user.api.ts
```typescript
/**
 * user模拟接口.
 * 必须实现MockApiInterface接口
 */
export class UserApi implements MockApiInterface {

  /**
   * 实现接口MockApiInterface中的injectMockHttpService方法
   * @param mockApiService 模拟API服务
   */
  injectMockHttpService(mockApiService: MockApiService): void {

    /**
     * 开始注册更新用户接口.
     * 请求方法为:put
     * url为: user/123
     */
    mockApiService.registerMockApi<User>('PUT', `^user/(\\d+)$`,
      // handler为该接口对应返回的模块数据
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
      });
  }
}
```

## 集成开发测试
集成开发测试中，使用`MockHttpClientModule`来替换angular的`HttpClientModule`，并同时手动注册接口。
```typescript
@NgModule({
   declarations: [
     AppComponent
   ],
   imports: [
     BrowserModule,
     AppRoutingModule,
     HttpClientModule
   ],
   providers: [
     {provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true},
   ],
   bootstrap: [AppComponent]
 })
 export class AppModule {
 }
 
 MockApiService.registerMockApi(UserApi);
```

此时调用更新方法时UserApi中的模拟返回值将生效。

当后台开发完毕后，移除MockApiInterceptor拦截器，则将进行正常的请求。

## 单元测试
在单元测试中的使用方法与上述方法基本相同，区别在于需要引用测试专用的拦截器


```typescript

MockApiService.registerMockApi(UserApi);

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: MockApiTestingInterceptor, multi: true},
      ]
    }).compileComponents();
  });
  
  it('should render title', () => {
    // 初始化组件，并手动调用ngOnInit()方法
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.ngOnInit();

    console.log('手动触发数据发送');
    getTestScheduler().flush();

    console.log('变更检测');
    fixture.detectChanges();

    console.log('断言');
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('12:test app is running!');
  });
});
```

## 返回状态码非200的值


## 使用建议
推荐建立单独的MockApiModule统一注册API：

```typescript
@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: MockApiTestingInterceptor, multi: true},
  ]
})
export class MockApiModule {
}

MockHttpClientService.registerMockApi(UserApi);
```

然后在集成测试及单元测试中分别引入MockApiModule。


# 其它

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
