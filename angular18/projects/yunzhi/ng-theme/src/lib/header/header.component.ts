import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ThemeService} from '../service/theme.service';
import {isNotNullOrUndefined} from '@yunzhi/utils';
import {tap} from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'theme-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [AsyncPipe]
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('header', {static: true})
  headerHtmlRef: ElementRef<HTMLElement> | undefined;

  // 当前用户
  currentUser: { name: string } | undefined;
  /**标题*/
  title = of('') as Observable<string>;
  /**颜色*/
  color = '#90111A';

  private subscription: Subscription | undefined;
  private titleElement: HTMLElement | undefined;

  constructor(private router: Router,
              private basicService: ThemeService) {
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
    this.headerHtmlRef!.nativeElement.style.backgroundImage = `url("${headerSrc}")`;
    this.titleElement = this.headerHtmlRef!.nativeElement.querySelector('.title') as HTMLElement;
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
      this.subscription!.unsubscribe();
    }
  }
}
