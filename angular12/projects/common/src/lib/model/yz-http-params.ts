import {HttpParams, HttpParamsOptions} from '@angular/common/http';

/**
 * 使用该类来替找HttpParams,结合相应的过滤器
 * 达到即可以在MockApi中使用has()方法来断言必然传入了哪些字段
 * 又达到不将null undefined NaN的值传给后台
 */
export class YzHttpParams extends HttpParams {
  private records = {} as Record<string, string | number | boolean>;

  constructor(options?: HttpParamsOptions) {
    super(options);
  }

  /**
   * 获取某个KEY的原值
   * 场景一:
   * 1. 综合查询时，对学生的状态进行查询。
   * 2. 在查询时，用户并未选择状态字段，直接点击的查询按钮。
   * 3. 此时在M层我们接收到的查询状态的值便是null或undefined
   * 4. 将null、undefined、NaN加入到HttpParams，则在后台或是调用`get()`方法时将得到字符串格式的`null`、`undefined`或`NaN`
   * 5. 而如果就这样将`null`、`undefined`或`NaN`则将导致查询错误（后台把它们理解为普通的字符串了）
   * 6. 这时候就需要在请求后台前加入过滤器把这些null、undefined、NaN过滤掉，而在过滤的过程中，我们还要防止过滤掉用户真实的字符串查询请求。
   * 比如用户就是想查值为`null`的某条记录
   * 7. 这时候`getOrigin()`方法就派上用场了，由于`getOrigin()`方法将返回null、undefined、NaN而非字符串`null`、`undefined`或`NaN`
   * 8. 所以在过滤的时候便不会误杀。
   * @param key 关键字
   */
  getOrigin(key: string) {
    return this.records[key];
  }

  append(key: string, value: string | number | boolean): HttpParams {
    this.records[key] = value;
    return super.append(key, value);
  }
}
