import {MockHttpClientService} from './mock-http-client.service';

/**
 * 所有模拟接口都应该实现该接口
 */
export interface MockApiInterface {
  injectMockHttpService(mockHttpClientService: MockHttpClientService): void;
}
