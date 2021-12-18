import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicComponent} from './basic.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HeaderModule} from './header/header.module';
import {MenuModule} from './menu/menu.module';
import {NavModule} from './nav/nav.module';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {BasicService} from './service/basic.service';

describe('BasicComponent', () => {
  let component: BasicComponent;
  let fixture: ComponentFixture<BasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicComponent],
      imports: [
        RouterTestingModule,
        HeaderModule,
        MenuModule,
        NavModule
      ],
      providers: [
        BasicService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl')
      .and.returnValue(of().toPromise<any>());
    fixture = TestBed.createComponent(BasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach((done) => {
    fixture.whenStable().then(() => done());
    fixture.autoDetectChanges();
  });
});
