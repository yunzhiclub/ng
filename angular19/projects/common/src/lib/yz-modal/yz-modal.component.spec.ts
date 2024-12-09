import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {YzModalComponent} from './yz-modal.component';
import {Component} from '@angular/core';


@Component({
  template: `
    <yz-modal>
      <h1>Hello World!</h1>
    </yz-modal>`,
  imports: [YzModalComponent]
})
class TestComponent {

  constructor() {
  }
}

describe('YzModalComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
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
