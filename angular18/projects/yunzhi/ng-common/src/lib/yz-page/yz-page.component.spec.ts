import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { YzPageComponent } from './yz-page.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PageComponent', () => {
  let component: YzPageComponent;
  let fixture: ComponentFixture<YzPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [YzPageComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YzPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
