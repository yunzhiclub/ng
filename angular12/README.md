梦云智开发团队angular开源库。

| 名称 | 基本功能 | 适用场景 | 
| ------ | ------ | ------ | 
| [MockApiInterceptor](https://github.com/yunzhiclub/ng/tree/main/projects/mock-api) | 对Http请求进行拦截，返回自定义API数据 | 使用文件统一前后台API、开发组件时抛弃测试桩而用生产环境的服务、避免一些因测试生产数据格式返回不统一造成的问题 |
| [MockApiTestingInterceptor](https://github.com/yunzhiclub/ng/tree/main/projects/mock-api) | 用于单元测试中对http请求拦截、手动控制数据返回时机 | 适用于单元测试 |

更多帮助文档请点击[github](https://github.com/yunzhiclub/ng)

# 安装
`npm i @yunzhi/ng-mock-api`


使用文档请参考：[MockApiInterceptor](https://github.com/yunzhiclub/ng/tree/main/projects/mock-api)

# 开发步骤

1. 进入项目根路径
2. `npm install`
3. 'node mock-api.js'
4. 编写代码,并同步在`project/sample`中完成相关集成测试。

## 发布
发布前先登录：`npm login`

然后进入相关文件夹完成发布：
`cd dist/mock-api && npm publish --access=public`

## 测试开发中的注意点
mock-api.js 监听的还不完美，可能在开发中有一些 BUG。

# 参考资源
[在angular模块中建立子模块](https://github.com/ng-packagr/ng-packagr/blob/master/docs/secondary-entrypoints.md)
