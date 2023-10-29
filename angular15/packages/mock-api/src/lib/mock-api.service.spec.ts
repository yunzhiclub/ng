
import {MockApiService} from './mock-api.service';
import {DelayHandler} from './delay-handler';

describe('MockApiService', () => {
  let service: MockApiService;

  beforeEach(() => {
    service = MockApiService.getMockApiService(new DelayHandler());
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

  fit('测试路由匹配', () => {
    expect(service.getHttpParams('/test', '/test')).toEqual({});
    expect(service.getHttpParams('test', '/test')).toEqual({});
    expect(service.getHttpParams('/test', 'test')).toEqual({});
    expect(service.getHttpParams('test', 'test')).toEqual({});
    expect(service.getHttpParams('test/123', 'test/:id')).toEqual({id: '123'});
    expect(service.getHttpParams('test/123/456', 'test/:id/:fooId')).toEqual({id: '123', fooId: '456'});
    expect(service.getHttpParams('test/123/foo/456', 'test/:id/foo/:fooId')).toEqual({id: '123', fooId: '456'});
    expect(service.getHttpParams('test/123/foo/456/789', 'test/:id/foo/:fooId/:barId')).toEqual({id: '123', fooId: '456', barId: '789'});
    expect(service.getHttpParams('test/123/foo/456/789', '/test/:id/foo/:fooId/:barId')).toEqual({id: '123', fooId: '456', barId: '789'});
  });
});
