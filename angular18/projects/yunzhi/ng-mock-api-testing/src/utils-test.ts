import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

/**
 * 等待方法体中的函数返回true后，再返回promise
 * @param lastMethod 返回boolean值的函数
 * @param failureMessage 错误提示消息
 * @param timeout 超时时间
 */
export const waitsFor = async (lastMethod: () => boolean, failureMessage = '花费的时间过长，请检查判断条件', timeout = 2000): Promise<boolean> => {
  let spentTime = 0;
  while (!lastMethod()) {
    if (spentTime > timeout) {
      throw new Error('花费的时间过长，请检查判断条件');
    }
    await interval(25).pipe(take(1)).toPromise();
    spentTime += 25;
  }
  return Promise.resolve(true);
};

/**
 * 等待一会
 * @param timeout 中断时长
 */
export const waits = async (timeout = 25): Promise<void> => {
  while (timeout > 0) {
    await interval(25).pipe(take(1)).toPromise();
    timeout -= 25;
  }
  return Promise.resolve();
};
