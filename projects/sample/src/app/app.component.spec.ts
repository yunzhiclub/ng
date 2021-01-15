import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {getTestScheduler} from 'jasmine-marbles';
import {UserApi} from './user.api';
import {MockHttpClientService} from '@yunzhi/ng-mock-http-client';
import {MockHttpClientTestingModule} from '@yunzhi/ng-mock-http-client/testing';

MockHttpClientService.registerMockApi(UserApi);

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockHttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
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
    expect(app.title).toEqual('sample');
  });

  fit('should render title', () => {
    // 初始化组件，并手动调用ngOnInit()方法
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.ngOnInit();

    console.log('手动触发数据发送');
    getTestScheduler().flush();

    console.log('变更检测');
    fixture.detectChanges();

    console.log('断言');
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('12:admin app is running!');
  });
});


