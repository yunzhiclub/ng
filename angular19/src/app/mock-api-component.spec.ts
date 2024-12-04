import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { UserApi } from "../mock-api/user.api";
import { getTestScheduler } from "jasmine-marbles"
import { MockApiTestingInterceptor } from "../../projects/mock-api-testing/src/public-api";


@Component({
    standalone: true,
    template: '<h1>hello {{username}}</h1>',
})
class TestComponent implements OnInit {
    username = '';

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {
        this.httpClient.get<string>(`user/getCurrentUsername`)
        .subscribe(username => {
            this.username = username;
        });
    }
}

describe('TestComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
            TestComponent
        ],
        providers: [
            provideHttpClient(
                withInterceptorsFromDi()
            ),
            {
                provide: HTTP_INTERCEPTORS,
                useClass: MockApiTestingInterceptor.forRoot([UserApi]), 
                multi: true
            }
        ],
        teardown: {
            destroyAfterEach: false
        }
        }).compileComponents();
    });

    it('should render title', () => {
        // 初始化组件，并手动调用ngOnInit()方法
        const fixture = TestBed.createComponent(TestComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.username).toEqual('');
        console.log('flush data by hand');
        getTestScheduler().flush();
        console.log('The mock api data will return immediate');
        expect(component.username).toEqual('mock user');
        console.log('end');
        fixture.detectChanges();
    });
});