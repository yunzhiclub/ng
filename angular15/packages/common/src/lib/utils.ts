import {DatePipe} from '@angular/common';
import {YzSorts} from "./yz-sort/yz-sort.directive";

/**
 * 工具类
 */
export class Utils {
  private static datePipe = new DatePipe('en-US');

  /**
   * 将时间戳转换为chrome可以使用的日期时间的格式
   * @param timestamp 时间戳 1630889606277
   * @return '2021-09-06T08:53'
   * @author panjie
   */
  public static timestampToDatetimeString(timestamp = new Date().getTime()): string {
    return Utils.datePipe.transform(new Date(timestamp).toISOString(), 'YYYY-MM-ddTHH:mm', 'GMT+8:00') as string;
  }

    /**
   * 将排序对象转换为排序数组
   * 使用示例：
   * const httpParam = new HttpParams().appendAll({sort: Utils.sortsToParams({id: 'asc', name: 'desc'})});
   * @param sorts
   */
  public static sortsToParams(sorts: YzSorts<any>):
    ReadonlyArray<string> {
    return Object.entries(sorts)
      .map(([key, value]) => {
        return (!!value && ['asc', 'desc'].includes(value.toLowerCase())) ? `${key},${value}` : null;
      }).filter(v => !!v).reverse() as ReadonlyArray<string>;
  }
}
