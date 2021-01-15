import {TestBed} from '@angular/core/testing';

import {MockHttpClientService} from './mock-http-client.service';
import {MockHttpClientTestingModule} from './mock-http-client.testing.module';

describe('MockHttpService', () => {
  let service: MockHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockHttpClientTestingModule
      ]
    });
    service = TestBed.inject(MockHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * 参考菜鸟教程的正则表达式在线
   * https://c.runoob.com/front-end/854
   */
  it('测试几个正则表达式', () => {
    const reg = RegExp('^/abc/\\d+$');
    expect(reg.test('/abc/123')).toBeTrue();
    expect(reg.test('/abc/1')).toBeTrue();
    expect(reg.test('/abc/')).toBeFalse();
    expect(reg.test('/abc/12/')).toBeFalse();
    expect(reg.test('/abc/12/23')).toBeFalse();
  });
});
