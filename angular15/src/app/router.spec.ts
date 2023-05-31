import {TestBed} from '@angular/core/testing';
import {RouterTestingModule, RouterStub, ActivatedRouteStub} from '@yunzhi/ng-router-testing';
import {ActivatedRoute, Params, Router} from '@angular/router';


describe('Router route测试', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
  });

  it('router 与 route的配合', () => {
    let params: Params;
    const router = TestBed.inject(Router) as unknown as RouterStub;
    const route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    console.log(router);
    console.log(route);
    route.queryParams.subscribe(p => {
      params = p;
    });
    expect(params).toBeUndefined();

    const queryParams = {page: '0'} as Params;
    router.navigate([''], {queryParams}).then();
    expect(params).toBe(queryParams);
  });
});
