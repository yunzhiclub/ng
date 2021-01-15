提供MockHttpClient，模似网络延迟。可在开发测试过程中替换原HttpClient，在不依赖于后台或其它API应用的前提下进行前台的独立开发。采用文件中自定义返回数据的方式，可脱离前后台接口文档，轻松完成前后台接口统一。

> 在angular10.1.5上应用测试通过，其它版本未测试。

# 使用方法
`npm i @yunzhi/ng-mock-http-client`

假设前台依赖于更新用户的`put user`接口：
``` typescript
pubilc updateUser(id: number, user: User): Observable<User> {
  this.httpClient.put<User>(`user/${id}`, user);
}
```

则可以建立模拟后台接口文件user.api.ts
```typescript
import {MockHttpClientService, MockHttpClientModule} from '@yunzhi/ng-mock-http-client';

export class UserApi implements MockApiInterface {
  injectMockHttpService(mockHttpService: MockHttpClientService): void { 
     let subject = null as Subject<HttpResponse<User>>;
     mockHttpService.registerMockApi(
       'PUT',
       `^user/(\d+)$`,
       () => {
         subject = new Subject<HttpResponse<User>>();
         return subject.asObservable();
       },
       (urlMatches, options, next) => {
         console.log(urlMatches);
         console.log(options);
         console.log(next);
         
         // 获取参数
         const id = urlMatches[1];
         
         // 获取body
         const body = options.body as User;
         
         // 回传user
         const user = {id, name: 'admin'} as User;
         next(user, subject);
       }
     );
  }
```

## 集成开发测试
集成开发测试中，使用`MockHttpClientModule`来替换angular的`HttpClientModule`，并同时手动注册接口。
```typescript
import {MockHttpClientService, MockHttpClientModule} from '@yunzhi/ng-mock-http-client';

@NgModule( {
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PartModule,
    MockHttpClientModule,
  ],
  bootstrap: [AppComponent]
} )
export class AppModule {
}

// 注册模拟接口
MockHttpClientService.registerMockApi(UserApi);
```

此时调用更新方法时UserApi中的模拟返回值将生效。

当后台开发完毕后，将`MockHttpClientModule`移除并替换为`HttpClientModule`（注册的模拟接口的代码可以全部删除掉），则将进行正常的请求。

## 单元测试
在单元测试中，我们需要引用`MockHttpClientTestingModule`来替换原`HttpClientModule`


```typescript
 beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnswerSheetComponent],
      imports: [
        MockHttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

```

## 返回状态码非200的值



# 其它

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Code scaffolding

Run `ng generate component component-name --project mock-http-client` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project mock-http-client`.
> Note: Don't forget to add `--project mock-http-client` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build mock-http-client` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build mock-http-client --prod`, go to the dist folder `cd dist/mock-http-client` and run `npm link` for test , at last run `npm publish`.

## Running unit tests

Run `ng test mock-http-client` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help


To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
