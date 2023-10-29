import {interval, Observable, Subscriber} from 'rxjs';
import {HttpEvent, HttpEventType, HttpResponse, HttpUploadProgressEvent} from '@angular/common/http';
import {randomNumber} from '@yunzhi/utils';
import {map, take} from 'rxjs/operators';

/**
 * 上传文件
 */
export class YzUploaderService {
  /**
   * 将图片文件渲染为可用于img标签的url.
   * @param file 文件
   */
  public static readerImageFileToDataURL(file: File): Observable<string> {
    const observable = new Observable<string>((subscriber: Subscriber<string>) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', event => {
        subscriber.next(event.target?.result as string);
        subscriber.complete();
      })
      fileReader.readAsDataURL(file);
    });
    return observable;
  }

  /**
   * 上传文件
   * <br>
   * 本方法的目的有二：
   * 1. 为单元测试提供保障：模拟一个上传的函数，该函数在2秒内完成上传，上传完成后返回一个空对象
   * 2. 给出方法的形参及返回信息，供调用本模块时用户重写
   * @param file 上传的文件
   */
  upload(file: File): Observable<HttpEvent<any>> {
    console.warn('请调用YzUploaderModule.forRoot()方法来重写YzUploaderService.upload方法');
    return new Observable<HttpEvent<object>>(subscriber => {
      let i = 0;
      const total = randomNumber(10000);
      interval(20).pipe(
        take(100),
        map(() => ++i)
      ).subscribe(data => {
        subscriber.next({
          type: HttpEventType.UploadProgress,
          loaded: data * total / 100,
          total
        } as HttpUploadProgressEvent);
        if (data === 100) {
          subscriber.next({
            type: HttpEventType.Response,
            body: {}
          } as HttpResponse<object>);
          subscriber.complete();
        }
      });
    });
  }
}
