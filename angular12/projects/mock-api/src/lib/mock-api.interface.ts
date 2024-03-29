import {ApiInjector} from './mock-api.types';

/**
 * 所有模拟接口都应该实现该接口
 */
export interface MockApiInterface {
  getInjectors(): ApiInjector[];
}
