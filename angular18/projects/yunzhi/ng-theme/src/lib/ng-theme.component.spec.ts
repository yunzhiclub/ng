import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgThemeComponent } from './ng-theme.component';

describe('NgThemeComponent', () => {
  let component: NgThemeComponent;
  let fixture: ComponentFixture<NgThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgThemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
