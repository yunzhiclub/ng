import { TestBed } from '@angular/core/testing';

import { RouterTestingService } from './router-testing.service';

describe('RouterTestingService', () => {
  let service: RouterTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
