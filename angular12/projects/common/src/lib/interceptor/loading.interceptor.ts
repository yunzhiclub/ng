import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';

/**
 * 加载中拦截器
 */
export class LoadingInterceptor implements HttpInterceptor {
  public static loadingSubject = new Subject<boolean>();
  public static loading$ = LoadingInterceptor.loadingSubject.asObservable();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    LoadingInterceptor.loadingSubject.next(true);
    return next.handle(req).pipe(finalize(() => LoadingInterceptor.loadingSubject.next(false)));
  }
}
