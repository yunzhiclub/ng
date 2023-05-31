import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasicService} from '../service/basic.service';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  title = '';
  showBack: boolean;

  constructor(private basicService: BasicService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.title = this.getTitle();

    this.basicService.isShowBack$()
      .subscribe(showBack => this.showBack = showBack);

    /** 订阅路由事件 */
    this.router.events
      /** 过滤：路由结束事件 */
      .pipe(filter((event) => {
        return event instanceof NavigationEnd;
      }))
      /** 订阅路由结束后执行的方法 */
      .subscribe(() => {
        console.log('end');
        this.title = this.getTitle();
      });
  }

  getTitle(): string {
    // 初始化
    let route: ActivatedRoute = this.activatedRoute;
    let title = '';
    // 遍历路由并拼接
    while (route) {
      if (route.snapshot.data.title && route.snapshot.component !== null) {
        title += route.snapshot.data.title + ' -> ';
      }
      route = route.firstChild!;
    }
    return title.substr(0, title.length - 4);
  }

  back(): void {
    this.basicService.back();
  }

  ngOnDestroy(): void {
  }
}
