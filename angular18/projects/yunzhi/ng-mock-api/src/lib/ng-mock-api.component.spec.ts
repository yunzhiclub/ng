import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMockApiComponent } from './ng-mock-api.component';

describe('NgMockApiComponent', () => {
  let component: NgMockApiComponent;
  let fixture: ComponentFixture<NgMockApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMockApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgMockApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
