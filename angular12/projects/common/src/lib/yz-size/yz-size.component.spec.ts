import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {YzSizeComponent} from './yz-size.component';
import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('SizeComponent', () => {
  let component: YzSizeComponent;
  let fixture: ComponentFixture<YzSizeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [YzSizeComponent],
      imports: [
        CommonModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YzSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
