import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YzSortComponent } from './yz-sort.component';

describe('YzSortComponent', () => {
  let component: YzSortComponent;
  let fixture: ComponentFixture<YzSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YzSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YzSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
