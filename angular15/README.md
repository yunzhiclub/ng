梦云智开发团队angular开源库。

| 名称 | 基本功能 | 适用场景 | 
| ------ | ------ | ------ | 
| [MockApiInterceptor](https://github.com/yunzhiclub/ng/tree/main/projects/mock-api) | 对Http请求进行拦截，返回自定义API数据 | 使用文件统一前后台API、开发组件时抛弃测试桩而用生产环境的服务、避免一些因测试生产数据格式返回不统一造成的问题 |
| [MockApiTestingInterceptor](https://github.com/yunzhiclub/ng/tree/main/projects/mock-api) | 用于单元测试中对http请求拦截、手动控制数据返回时机 | 适用于单元测试 |

更多帮助文档请点击[github](https://github.com/yunzhiclub/ng)


# 安装
`npm i @yunzhi/utils`
`npm i @yunzhi/ng-mock-api`
`npm i @yunzhi/ng-router-testing`
`npm i @yunzhi/ng-theme-basic`
`npm i @yunzhi/ng-common`


使用文档请参考：[MockApiInterceptor](https://github.com/yunzhiclub/ng/tree/main/projects/mock-api)

# 开发步骤
创建新库`ng g library my-lib`

1. 进入项目根路径
2. `npm install`
3. 'node mock-api.js' 或 `node router-testing.js` 或 `node common.js` 或 `node theme.js`
4. 编写代码,并同步在`project/sample`中完成相关集成测试。

## 发布前测试
1. 进入相关文件夹，执行`npm link`，比如：`cd dist/mock-api && npm link`
2. 建立测试项目，执行`npm link xxx`，即相当于直接安装了`xxx`。
3. 进行相关测试
4. 需要注意的是Angular中默认禁止了这种`npm link xxx`来直接链接本地库的操作，若要使用测试成功，则需要在`angular.json`添加如下配置：

in your angular app that depends on your local library, set projects.projectName.architect.build.options.preserveSymlinks with true in angular.json will prevent the angular cli from updating linked local library

```
projects.projectName.architect.build.options.preserveSymlinks: true
```

相关设置说明请参考：
[https://github.com/angular/angular/issues/35586](https://github.com/angular/angular/issues/35586)
## 发布
使用`prod`选项来build项目，比如`ng build common --prod`.

登录：`npm login`

然后进入相关文件夹完成发布：
`cd dist/mock-api && npm publish --access=public`
或
`cd dist/router-testing && npm publish --access=public`

## 测试开发中的注意点
mock-api(router-testing).js 监听的还不完美，可能在开发中有一些 BUG。

# 参考资源
[在angular模块中建立子模块](https://github.com/ng-packagr/ng-packagr/blob/master/docs/secondary-entrypoints.md)
