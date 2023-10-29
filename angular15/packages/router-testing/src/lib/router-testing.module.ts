import {NgModule} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule as AngularRouterTestingModule} from '@angular/router/testing';
import {ActivatedRouteStub} from './activated-route.stub';
import {RouterStub} from './router.stub';


@NgModule({
  imports: [AngularRouterTestingModule],
  providers: [
    {provide: ActivatedRoute, useClass: ActivatedRouteStub},
    {provide: Router, useClass: RouterStub},
  ],
  exports: [AngularRouterTestingModule]
})
export class RouterTestingModule {
}
