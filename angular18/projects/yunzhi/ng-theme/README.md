基于bootstrap4的蓝色主题
-----
## 说明
该模板由本文件夹中的代码以及asset中的basic共同组成。

## 依赖
```bash
npm install -s bootstrap@4.6.0
npm install -s @fortawesome/fontawesome-free@5.15.3
```

## 使用步骤
1. 引入样式表
```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "./node_modules/@fortawesome/fontawesome-free/css/all.css",
  "src/styles.scss"
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
  standalone: true,
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
