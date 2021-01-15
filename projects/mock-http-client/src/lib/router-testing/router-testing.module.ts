import {NgModule} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub} from './activated-route.stub';
import {RouterStub} from './router.stub';
import {RouterTestingModule as AngularRouterTestingModule} from '@angular/router/testing';

@NgModule({
  imports: [
    AngularRouterTestingModule
  ],
  providers: [
    {provide: ActivatedRoute, useClass: ActivatedRouteStub},
    {provide: Router, useClass: RouterStub},
  ],
  exports: [
    AngularRouterTestingModule
  ]
})
export class RouterTestingModule {
}
