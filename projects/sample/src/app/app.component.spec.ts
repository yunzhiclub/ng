import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {getTestScheduler} from 'jasmine-marbles';
import {UserApi} from './user.api';
import {MockApiService} from '../../../mock-api/src/lib/mock-api.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiInterceptorTesting} from '../../../mock-api/testing/src/lib/mock-api.interceptor.testing';

MockApiService.registerMockApi(UserApi);

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptorTesting, multi: true},

      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sample'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Error');
  });

  it('should render title', () => {
    // 初始化组件，并手动调用ngOnInit()方法
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.ngOnInit();

    console.log('手动触发数据发送');
    getTestScheduler().flush();

    console.log('变更检测');
    fixture.detectChanges();

    console.log('断言');
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('12:admin app is running!');
  });
});


