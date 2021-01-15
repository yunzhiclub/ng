import {MockLoadingInterface} from './mock-loading.interface';
import {Injectable} from '@angular/core';

/**
 * 加载中默认的provider
 */
@Injectable()
export class MockLoadingService implements MockLoadingInterface {
  sendLoading(loading: boolean): void {
  }
}
