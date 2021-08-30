import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {ApiModule} from '../api/api.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        ApiModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl')
      .and.returnValue(of().toPromise<any>());
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach((done) => {
    fixture.whenStable().then(() => done());
  });
});
