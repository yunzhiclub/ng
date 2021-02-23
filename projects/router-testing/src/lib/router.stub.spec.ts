import {TestBed} from '@angular/core/testing';
import {RouterStub} from './router.stub';
import {RouterTestingModule as AngularRouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('RouterStub', () => {
  let service: RouterStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularRouterTestingModule]
    });
    service = TestBed.inject(Router) as unknown as RouterStub;
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
