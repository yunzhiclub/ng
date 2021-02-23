import {MockApiService} from './mock-api.service';

/**
 * 所有模拟接口都应该实现该接口
 */
export interface MockApiInterface {
  injectMockHttpService(mockHttpClientService: MockApiService): void;
}
