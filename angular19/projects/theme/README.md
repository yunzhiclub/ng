基于bootstrap4的蓝色主题
-----
## 说明
该模板由本文件夹中的代码以及asset中的basic共同组成。

## 依赖
```bash
npm install -s bootstrap@4.6.0
npm install -s jquery@3.5.1
npm install -s popper.js@1.16.1
npm install -s @fortawesome/fontawesome-free5.15.3
npm install --save-dev @types/jquery@3.5.1
```

## 使用步骤
1. 安装上述3个依赖。
2. 于angular.json中引入jquery, bootstrap, popper，以及自定义的custom.js
```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "./node_modules/@fortawesome/fontawesome-free/css/all.css",
  "src/styles.scss"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.slim.min.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]       
```
1. add header


3. 使用方法
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasicComponent, ThemeService } from '../../projects/theme/src/public-api';

export class MyThemeService extends ThemeService {
  // 在此复写
}

@Component({
  selector: 'app-root',
  imports: [BasicComponent],
  template: `
    <theme-basic>
      <h1>hello</h1>
    </theme-basic>`,
    providers: [
      {
        provide: ThemeService, useClass: MyThemeService
      }
    ]
})
export class AppComponent {
  title = 'angular19';
}

```