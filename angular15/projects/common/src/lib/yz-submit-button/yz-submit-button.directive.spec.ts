import {Component, OnInit} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {YzSubmitButtonDirective} from './yz-submit-button.directive';


@Component({
  template: `<button class="btn btn-primary" [yzSubmitButton]="submitting"><i class="fas fa-eye"></i>测试</button>`
})
class Test implements  OnInit {
  submitting = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.submitting = true;
      setTimeout(() => {
        this.submitting = false;
      }, 1000);
    }, 1000)
  }
}

describe('yz-submit-directive', () => {
  let component: Test;
  let fixture: ComponentFixture<Test>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Test, YzSubmitButtonDirective],
      imports: [
        CommonModule,
        // YzSubmitButtonModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Test);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.autoDetectChanges();
  });

});
