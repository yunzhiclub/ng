import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {Router} from '@angular/router';
import {firstValueFrom, of} from 'rxjs';
import {ApiModule} from '../api/api.module';
import {BasicService} from '../service/basic.service';
import {RouterTestingModule} from '../../../../ng-router-testing/src/public-api';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        ApiModule,
        RouterTestingModule
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
      .and.returnValue(firstValueFrom(of(true)));
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
