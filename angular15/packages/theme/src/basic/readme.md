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
3. 在var.scss的最后一行引入模板变量
```scss
@import "app/theme/basic/variable";
```
4. 在 styles.scss中的首行引入模板样式
```scss
@import './app/theme/basic/style';
```

5. 定义路由时，将 BasicComponent 设置为父组件：
```typescript
  {
    path: '',
    component: BasicComponent,
    children: []
  }
```
同时在模块中对应引入BasicModule：
```typescript
import {BasicModule} from './theme/basic/basic.module';
```




