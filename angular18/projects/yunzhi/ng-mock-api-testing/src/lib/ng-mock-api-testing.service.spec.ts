import { TestBed } from '@angular/core/testing';

import { NgMockApiTestingService } from './ng-mock-api-testing.service';

describe('NgMockApiTestingService', () => {
  let service: NgMockApiTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMockApiTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
