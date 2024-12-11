import { TestBed } from '@angular/core/testing';

import { NgMockApiService } from './ng-mock-api.service';

describe('NgMockApiService', () => {
  let service: NgMockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
