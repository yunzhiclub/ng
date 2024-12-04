import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { YzPageComponent } from './yz-page.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  template: `<yz-page [totalElements]="200" [page]="9" (changePage)="onPageChange($event)"></yz-page>`,
  imports: [YzPageComponent],
  styles: `
  :host ::ng-deep .active > a {color: red}
  :host ::ng-deep .disabled > a {font-size: 2em}
  `
})
class TestComponent {
  public onPageChange(page: number) {
    console.log(page);
  }
}


describe('PageComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestComponent,
        CommonModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      teardown: {
        destroyAfterEach: false
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
