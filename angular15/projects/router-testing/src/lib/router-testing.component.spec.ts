import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingComponent } from './router-testing.component';

describe('RouterTestingComponent', () => {
  let component: RouterTestingComponent;
  let fixture: ComponentFixture<RouterTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterTestingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
