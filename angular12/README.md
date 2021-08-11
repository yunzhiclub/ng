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

## 简单方法

该方法操作简单,节省资源,但不智能

1. `npm install`
2. 注释掉`import {xxx} from '@yunzhi/ng-xxxx'`
3. 改为直接文件的相对路径 `import {xxx} from '../../xxx/xxx'`
4. 在mock-api或router-testing文件夹开发相关功能
5. 在`sample`子项目验证功能

## 智能方法

1. 进入项目根路径
2. `ng build mock-api --prod`
3. 进入根目录生成的dist文件夹的 mock-api 文件夹
4. 执行 `npm link`
7. 分别进入`projects/sample`,`projects/mock-api/testing`,`projects/mock-api
   `执行`npm link @yunzhi/ng-mock-api`， `npm link @yunzhi/ng-router-testing`
8. 执行 `ng build mock-api --watch=true --prod`
9. 编写代码,并同步在`project/sample`中完成相关集成测试。

# 打包测试

开发完成后需要进一步的验证生产环境。

1. 将`import {xxx} from '../../xxx/xxx'`变更为`import {xxx} from '@yunzhi/ng-xxxx'`
2. `ng build mock-api --prod`及`ng build router-testing --prod`
3. 进入根目录生成的dist文件夹的 mock-api 文件夹
4. 执行 `npm link`
5. 进入根目录生成的dist文件夹的 router-testing 文件夹
6. 执行 `npm link`
7. 分别进入`projects/sample`,`projects/mock-api
   `执行`npm link @yunzhi/ng-mock-api`， `npm link @yunzhi/ng-router-testing`
8. 进入`project/smploe`，完成集成测试。

## 发布
发布前先登录：`npm login`

然后进入相关文件夹完成发布：
`cd dist/mock-api && npm publish --access=public`

## 测试开发中的注意点

每次修改一点都按上述开发步骤执行一次不太现实，在实际的开发过程中往往是边开发边测试。开发中应该多用单元测试，以代码测代码以保证代码的质量。在进行集成测试时，每次代码变更后都需要重新执行`ng build xxx --prod`。

# 参考资源

[在angular模块中建立子模块](https://github.com/ng-packagr/ng-packagr/blob/master/docs/secondary-entrypoints.md)
