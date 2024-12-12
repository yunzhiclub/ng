import {YzSortDirective} from './yz-sort.directive';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  template: `
    <table>
      <tr>
        <th yzSort>123</th>
        <th>456</th>
      </tr>
    </table>`,
  imports: [
    YzSortDirective
  ]
})
class TestComponent {
}

describe('YzSortDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestComponent,
        CommonModule,
        YzSortDirective
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

  fit('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
