import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { YzMaskComponent } from './yz-mask.component';

describe('YzMaskComponent', () => {
  let component: YzMaskComponent;
  let fixture: ComponentFixture<YzMaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ YzMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YzMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
