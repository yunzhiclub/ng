import {HttpEvent} from '@angular/common/http';
import {Subscriber} from 'rxjs/internal/Subscriber';

/**
 * 延时处理器.
 */
export interface DelayHandlerInterface {
  /**
   * 随机延迟发送数据
   * @param data 数据
   * @param subscriber 订阅者
   */
  next<T>(data: T, subscriber: Subscriber<HttpEvent<T>>): void;
}
