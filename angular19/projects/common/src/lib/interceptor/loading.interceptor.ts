import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, Subscription, throwError} from 'rxjs';
import {catchError, delay, finalize} from 'rxjs/operators';

/**
 * 加载中拦截器
 */
export class LoadingInterceptor implements HttpInterceptor {
  public static ignoreKey = 'loading-ignore';
  private loading = 0;
  private showLoadingSubscription: Subscription | undefined | null;
  private hideLoadingSubscription: Subscription | undefined | null;

  public hideLoading = () => {
    console.warn('请重写LoadingInterceptor.hideLoading');
  }

  public showLoading = () => {
    console.warn('请重写LoadingInterceptor.showLoading方法');
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.params.has(LoadingInterceptor.ignoreKey)) {
      return next.handle(req);
    } else {
      this.setLoading(true);
      return next.handle(req).pipe(finalize(() => this.setLoading(false)),
        catchError(err => {
          this.setLoading(false);
          return throwError(err);
        }));
    }
  }

  setLoading(loading: boolean): void {
    if (loading) {
      this.loading++;
    } else if (this.loading > 0) {
      this.loading--;
    }

    if (this.loading === 1 && loading) {
      if (this.hideLoadingSubscription) {
        this.hideLoadingSubscription.unsubscribe();
        this.hideLoadingSubscription = null;
      } else {
        this.showLoadingSubscription = of({}).pipe(delay(500)).subscribe(
          () => {
            this.showLoading();
            this.showLoadingSubscription = null;
          });
      }
    } else if (this.loading === 0) {
      if (this.showLoadingSubscription) {
        this.showLoadingSubscription.unsubscribe();
        this.showLoadingSubscription = null;
      } else {
        // 100MS后再选择隐藏，防止前台接连请求时loading频闪的问题
        this.hideLoadingSubscription = of({}).pipe(delay(100))
          .subscribe(() => {
            this.hideLoading();
            this.hideLoadingSubscription = null;
          });
      }
    }
  }
}
