import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, Subscription} from 'rxjs';
import {delay, finalize} from 'rxjs/operators';

/**
 * 加载中拦截器
 */
export class LoadingInterceptor implements HttpInterceptor {
  public static ignoreKey = 'loading-ignore';
  private loading = 0;
  private showLoadingSubscription = null as Subscription;
  private hideLoadingSubscription = null as Subscription;

  public static hideLoading = () => {
    console.warn('请重写LoadingInterceptor.hideLoading');
  }

  public static  showLoading = () => {
    console.warn('请重写LoadingInterceptor.showLoading方法');
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.params.has(LoadingInterceptor.ignoreKey)) {
      return next.handle(req);
    } else {
      this.setLoading(true);
      return next.handle(req).pipe(finalize(() => this.setLoading(false)));
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
            LoadingInterceptor.showLoading();
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
            LoadingInterceptor.hideLoading();
            this.hideLoadingSubscription = null;
          });
      }
    }
  }
}
