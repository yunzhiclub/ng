
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

  it('测试路由匹配', () => {
    expect(service.getHttpParams('/test', '/test')).toEqual({});
    expect(service.getHttpParams('test', '/test')).toEqual({});
    expect(service.getHttpParams('/test', 'test')).toEqual({});
    expect(service.getHttpParams('test', 'test')).toEqual({});
    expect(service.getHttpParams('/test', '/test/abc')).toBeNull();
    expect(service.getHttpParams('test/123', 'test/:id')).toEqual({id: '123'});
    expect(service.getHttpParams('test/123/456', 'test/:id')).toBeNull();
    expect(service.getHttpParams('test/123/456', 'test/:id/:fooId')).toEqual({id: '123', fooId: '456'});
    expect(service.getHttpParams('test/123/foo/456', 'test/:id/foo/:fooId')).toEqual({id: '123', fooId: '456'});
    expect(service.getHttpParams('test/123/foo/456', 'test/:id/foo/:fooId/:testId')).toBeNull();
    expect(service.getHttpParams('test/123/foo/456/789', 'test/:id/foo/:fooId/:barId')).toEqual({id: '123', fooId: '456', barId: '789'});
    expect(service.getHttpParams('test/123/foo/456/789', '/test/:id/foo/:fooId/:barId')).toEqual({id: '123', fooId: '456', barId: '789'});
    expect(service.getHttpParams('test/123/foo/456/789/abcd', '/test/:id/foo/:fooId/:barId')).toBeNull();
  });
});
