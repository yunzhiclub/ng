import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {YzModalComponent} from './yz-modal.component';
import {Component} from '@angular/core';


@Component({
  template: `
    <yz-modal>
      <h1>Hello World!</h1>
    </yz-modal>`,
  styles: `
    /*以下样式使用:host ::ng-deep注入到子组件YzModalComponent中 */
    :host ::ng-deep {
      .modal {
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 1072;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        outline: 0;
        display: block;
        padding-right: 15px;
      }

      .modal-dialog {
        transform: none;
        transition: transform .3s ease-out, -webkit-transform .3s ease-out;
        max-width: 500px;
        margin: 1.75rem auto;
        position: relative;
        width: auto;
        pointer-events: none;
      }

      .fade {
        transition: opacity .15s linear;
      }

      .modal-content {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: .3rem;
        outline: 0;
      }
    }
  `,
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

  fit('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
