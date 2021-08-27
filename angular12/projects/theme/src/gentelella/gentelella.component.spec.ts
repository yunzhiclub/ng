import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GentelellaComponent} from './gentelella.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FooterComponent} from './footer/footer.component';
import {TopNavBarComponent} from './top-nav-bar/top-nav-bar.component';
import {SidebarComponent} from './sidebar/sidebar.component';

describe('GentelellaComponent', () => {
  let component: GentelellaComponent;
  let fixture: ComponentFixture<GentelellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GentelellaComponent,
        FooterComponent,
        TopNavBarComponent,
        SidebarComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GentelellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
