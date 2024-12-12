import {YzSortDirective} from './yz-sort.directive';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {YzSorts} from "./yz-sort.component";

@Component({
  standalone: true,
  template: `
    <table class="table">
      <tr>
        <th [yzSort]="'id'" [yzSorts]="sorts" (beYzSortChange)="onSortsChange($event)">ID</th>
        <th [yzSort]="'name'" [yzSorts]="sorts" (beYzSortChange)="onSortsChange($event)">name</th>
        <th [yzSort]="'username'" [yzSorts]="sorts" (beYzSortChange)="onSortsChange($event)">username</th>
        <th [yzSort]="'other'" [yzSorts]="sorts" (beYzSortChange)="onSortsChange($event)">other</th>
      </tr>
    </table>`,
  imports: [
    YzSortDirective
  ]
})
class TestComponent {
  sorts = {
    id: null,
    name: 'asc',
    username: 'desc'
  } as YzSorts;

  onSortsChange(sorts: YzSorts): void {
    console.log(sorts);
    this.sorts = sorts;
  }
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
    fixture.autoDetectChanges();
  });
});
