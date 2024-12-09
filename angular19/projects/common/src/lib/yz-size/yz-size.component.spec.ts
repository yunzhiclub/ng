import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {YzSizeComponent} from './yz-size.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {randomNumber} from '@yunzhi/utils';

@Component({
  standalone: true,
  template: `{{size}}<yz-size [size]="size" (changeSize)="onSizeChange($event)"></yz-size>`,
  imports: [YzSizeComponent]
})
class TestComponent {
  @ViewChild(YzSizeComponent)
  sizeComponent: YzSizeComponent | undefined;

  size = 50;
  onSizeChange($event: number) {
    this.size = $event;
  }
}
describe('SizeComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestComponent,
        CommonModule,
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

  fit('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('ouput', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(component.sizeComponent).toBeTruthy();
    const size = randomNumber();
    spyOn(component, 'onSizeChange');
    component.sizeComponent!.sizeControl.setValue(size);
    expect(component.onSizeChange).toHaveBeenCalledWith(size);
  });

  it('input', () => {
    fixture.detectChanges();
    const size = randomNumber();
    component.size = size;
    expect(component.sizeComponent).toBeTruthy();
    fixture.detectChanges();
    expect(component.sizeComponent?.sizeControl.value).toEqual(size);
  });

  afterEach(() => {
    fixture.autoDetectChanges();
  })
});
