import {YzSortDirective} from './yz-sort.directive';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {YzSortComponent, YzSorts} from "./yz-sort.component";
import {By} from "@angular/platform-browser";

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

  it('should create an instance', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });

  it('测试输出', () => {
    const sortComponentRefs = fixture.debugElement.queryAll(By.directive(YzSortComponent));
    expect(sortComponentRefs[0].componentInstance).toBeTruthy();
    spyOn(component, 'onSortsChange');
    const result = {};
    (sortComponentRefs[0].componentInstance as YzSortComponent).beChange.emit(result);
    expect(component.onSortsChange).toHaveBeenCalledWith(result);
  });

  it('测试输入', () => {
    const sortComponentRefs = fixture.debugElement.queryAll(By.directive(YzSortComponent));
    expect(sortComponentRefs[0].componentInstance).toBeTruthy();
    expect((sortComponentRefs[0].componentInstance as YzSortComponent).sorts).toBe(component.sorts);
    expect((sortComponentRefs[0].componentInstance as YzSortComponent).key).toBe('id');
  });
});
