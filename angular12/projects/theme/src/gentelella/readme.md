基于bootstrap3的蓝色主题
-----
## 说明
该模板由本文件夹中的代码以及asset中的gentelella共同组成。

## 依赖
1. bootstrap: 3.4.1
2. jquery: 3.5.1
3. popper.js: 1.16.1

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
              "./node_modules/bootstrap/dist/js/bootstrap.min.js",
              "./node_modules/@fortawesome/fontawesome-free/js/all.js",
              "./src/assets/gentelella/js/custom.js"
            ]
```
3. 在var.scss的最后一行引入模板变量
```scss
@import "app/theme/gentelella/var";
```
4. 在 styles.scss中的首行引入模板样式
```scss
@import './app/theme/gentelella/style';
```

5. 定义路由时，将 GentelellaComponent 设置为父组件：
```typescript
  {
    path: '',
    component: GentelellaComponent,
    children: []
  }
```
同时在模块中对应引入GentelellaModule：
```typescript
import {GentelellaModule} from './theme/gentelella/gentelella.module';
```
## 注意
该模板尚在开发中，部分工作未完成。


