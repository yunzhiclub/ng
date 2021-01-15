提供MockHttpClient，模似网络延迟。可在开发测试过程中替换原HttpClient，在不依赖于后台或其它API应用的前提下进行前台的独立开发。采用文件中自定义返回数据的方式，可脱离前后台接口文档，轻松完成前后台接口统一。

> 在angular10.1.5上应用测试通过，其它版本未测试。

# 使用方法
`npm i @yunzhi/ng-mock-http-client`

## 集成开发测试

## 单元测试

# 其它

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Code scaffolding

Run `ng generate component component-name --project mock-http-client` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project mock-http-client`.
> Note: Don't forget to add `--project mock-http-client` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build mock-http-client` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build mock-http-client`, go to the dist folder `cd dist/mock-http-client` and run `npm publish`.

## Running unit tests

Run `ng test mock-http-client` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
