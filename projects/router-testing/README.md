# RouterTesting

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

## Code scaffolding

Run `ng generate component component-name --project router-testing` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project router-testing`.
> Note: Don't forget to add `--project router-testing` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build router-testing` to build the project. The build artifacts will be stored in the `dist/` directory.


## Before Publish
You should test the project before publish。
After building your library with `ng build router-testing --prod`, go to the dist folder `cd dist/router-testing` and run `npm link` for test。

Then go to test project add `@yunzhi/router-testing@version` to package.json，and run `npm link @yunzhi/router-testing`。

## Publishing

After building your library with `ng build mock-http-client --prod`, go to the dist folder `cd dist/mock-http-client` and run `npm link` for test , at last run `npm publish`.

## Running unit tests

Run `ng test router-testing` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
