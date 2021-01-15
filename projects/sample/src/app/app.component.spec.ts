import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {getTestScheduler} from 'jasmine-marbles';
import {MockHttpClientTestingModule} from '../../../mock-http-client/src/lib/mock-http-client/mock-http-client.testing.module';
import {UserApi} from './user.api';
import {MockHttpClientService} from '';

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
    const fixture = TestBed.createComponent(AppComponent);
    getTestScheduler().flush();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('12:admin app is running!');
  });
});

MockHttpClientService.registerMockApi(UserApi);
