import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {getTestScheduler} from 'jasmine-marbles';
import {UserApi} from './user.api';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import {MockApiTestingInterceptor} from '../../../mock-api/testing/src/lib/mock-api.testing.interceptor';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';


describe('AppComponent', () => {
  beforeEach(async (done) => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: HTTP_INTERCEPTORS,
          useClass: MockApiTestingInterceptor.forRoot([
            UserApi
          ]),
          multi: true},
      ]
    }).compileComponents().then(() => done());
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
    expect(compiled.querySelector('h1').textContent).toContain('12:test app is running!');
  });
});


