~~## How to use it
import the BasicModule in your module (eg: AppModule)
```typescript
    BasicModule.forRoot({
      basicService: ThemeService
    })
```

The ThemeService most link blow:
```typescript

```

## 使用方法


在模块下（通常是根AppModule)中引入BasicModule.
```typescript
    BasicModule.forRoot({
      basicService: ThemeService
    })
```

`ThemeService`示例如下：
```typescript
import {BasicService} from '../../theme/src/basic/service/basic.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BasicService {

  /**
   * 标题
   */
  getTitle(): Observable<string> {
    return of('标题重写测试');
  }

  /**
   * 注销
   */
  logout(): void {
    console.info('重写logout()实现注销');
  }
}

```

And you can see `BasicService` for override details.

<hr>

# Theme

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## Code scaffolding

Run `ng generate component component-name --project theme` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project theme`.
> Note: Don't forget to add `--project theme` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build theme` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build theme`, go to the dist folder `cd dist/theme` and run `npm publish`.

## Running unit tests

Run `ng test theme` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Before Publish
You should test the project before publish。
After building your library with `ng build theme --prod`, go to the project root folder run `cd dist/theme` and then run `npm link` for test。

Then go to test project add `@yunzhi/ng-theme@version` to package.json，and run `npm link @yunzhi/ng-theme`。

## Publishing

After building your library with `ng build mock-api --prod`, go to the dist folder `cd dist/mock-api` and run `npm link` for test , at last run `npm publish`.
If MockApiInterceptor be used, you can't tick the time anymore.
