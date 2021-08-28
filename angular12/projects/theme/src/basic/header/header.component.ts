import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {BasicService} from '../service/basic.service';
import {isNotNullOrUndefined} from '@yunzhi/ng-mock-api';

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
  title: string;
  /**颜色*/
  color = '#90111A';

  private subscription: Subscription | undefined;

  constructor(private router: Router,
              private basicService: BasicService) {
  }

  ngOnInit(): void {
    this.title = this.basicService.getTitle();
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
    const titleElement = this.headerHtmlRef.nativeElement.querySelector('.title') as HTMLElement;
    titleElement.style.width = titleElement.innerText.length.toString() + 'em';
    titleElement.style.color = this.color;
  }

  ngOnDestroy(): void {
    if (isNotNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }
}
