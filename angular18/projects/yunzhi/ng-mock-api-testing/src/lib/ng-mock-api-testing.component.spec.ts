import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMockApiTestingComponent } from './ng-mock-api-testing.component';

describe('NgMockApiTestingComponent', () => {
  let component: NgMockApiTestingComponent;
  let fixture: ComponentFixture<NgMockApiTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMockApiTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgMockApiTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
