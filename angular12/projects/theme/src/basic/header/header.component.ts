import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {BasicService} from '../service/basic.service';
import {isNotNullOrUndefined} from '@yunzhi/ng-mock-api';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('header', {static: true})
  headerHtmlRef: ElementRef<HTMLElement>;

  // 当前用户
  currentUser: { name: string };
  /**标题*/
  title: Observable<string>;
  /**颜色*/
  color = '#90111A';

  private subscription: Subscription | undefined;
  private titleElement: HTMLElement;

  constructor(private router: Router,
              private basicService: BasicService) {
  }

  ngOnInit(): void {
    this.title = this.basicService.getTitle().pipe(tap(title => this.resetTitleWidth(title.length)));
    const colors = this.basicService.getColors();
    if (colors && colors.title && colors.title.color) {
      this.color = colors.title.color;
    }
    this.subscription = this.basicService.getCurrentLoginUser$()
      .subscribe(user => this.currentUser = user);
  }

  /**
   * 用户点击了用户名
   */
  onClickUserName() {
    this.basicService.onClickUserName();
  }

  onLogout(): void {
    /**
     * complete 时跳转
     */
    this.basicService.logout();
  }

  /**
   * 添加 header的背景图片、标题
   */
  ngAfterViewInit(): void {
    const headerSrc = this.basicService.getHeaderImageSrc();
    this.headerHtmlRef.nativeElement.style.backgroundImage = `url("${headerSrc}")`;
    this.titleElement = this.headerHtmlRef.nativeElement.querySelector('.title') as HTMLElement;
    this.titleElement.style.color = this.color;
    this.resetTitleWidth(this.titleElement.innerText.length);
  }

  /**
   * 重新设置标题的宽度
   */
  resetTitleWidth(length: number): void {
    if (this.titleElement) {
      // +1解决windows下长度不够的问题
      this.titleElement.style.width = (length + 1).toString() + 'em';
    }
  }

  ngOnDestroy(): void {
    if (isNotNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }
}
