import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {YzSortComponent, YzSorts} from "./yz-sort.component";

describe('yzSortComponent', () => {
  let component: YzSortComponent;
  let fixture: ComponentFixture<YzSortComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [YzSortComponent],
      teardown: {
        destroyAfterEach: false
      }
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YzSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('on click', () => {
    let sort = {} as YzSorts<{id: number}>;
    component.beChange.asObservable().subscribe(v => {
      sort = v;
    });
    component.key = 'id';
    component.onClick();
    expect(sort).toEqual({id: 'asc'});

    component.onClick();
    expect(sort).toEqual({id: 'desc'});

    component.onClick();
    expect(sort).toEqual({} as {id: 'asc' | 'desc'});
  });
})
