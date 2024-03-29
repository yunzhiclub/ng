import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {getTestScheduler} from 'jasmine-marbles';
import {UserApi} from './user.api';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpRequest} from '@angular/common/http';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {ActivatedRoute, Params, Router} from '@angular/router';


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
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockApiTestingInterceptor
            .forRoot([UserApi], {
              filter: (req: HttpRequest<any>) => !req.url.startsWith('assets')
            }),
          multi: true
        },
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
    expect(app.title).toEqual('Loading');
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
    expect(compiled.querySelector('h2').textContent).toContain('yunzhi');
    expect(compiled.querySelector('h3').textContent).toContain('通过');
  });
});


