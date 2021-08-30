import {Observable, of} from 'rxjs';
import {HttpEvent} from '@angular/common/http';

/**
 * 附件
 */
export class AttachmentService {

  /**
   * 上传
   * @param file
   */
  upload(file: File): Observable<HttpEvent<any>> {
    console.warn('请重写upload实现文件上传操作');
    return of({} as HttpEvent<any>);
  }
}
