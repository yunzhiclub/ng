import { TestBed } from '@angular/core/testing';

import { NgThemeService } from './ng-theme.service';

describe('NgThemeService', () => {
  let service: NgThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
