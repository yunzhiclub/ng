# MockApiTesting

For angular httpClient reqeust test! The lib base on  [https://www.npmjs.com/package/@yunzhi/ng-mock-api](https://www.npmjs.com/package/@yunzhi/ng-mock-api)

### Unit Test
1. install jasmine-marbles

```shell
npm install jasmine-marbles@0.9.2 --save-dev 
```

2. Set UserApi to DynamicTestingModule

```typescript
@Component({
  template: '<h1>hello {{username}}</h1>'
})
class AppComponent implements OnInit {
  username = '';
  
  constructor(private httpClient: HttpClient) {
  }
  
  ngOnInit(): void { 
    this.httpClient.get<string>(`user/getCurrentUsername`)
      .subscribe(username => this.username = username);
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        // action: Use the HttpClientModule but not HttpClientTestingModule
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockApiTestingInterceptor
            .forRoot([UserApi]),
          multi: true
        },
      ]
    }).compileComponents();
  });

  it('should render title', () => {
    // 初始化组件，并手动调用ngOnInit()方法
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    expect(app.username).toEqual('');
    console.log('flush data by hand');
    getTestScheduler().flush();
    console.log('The mock api data will return immediate');
    expect(app.username).toEqual('yunzhi');
  });
});
```
