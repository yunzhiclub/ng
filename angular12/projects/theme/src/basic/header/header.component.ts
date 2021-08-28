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
  @ViewChild('#header', {static: true})
  headerHtmlRef: ElementRef<HTMLElement>;

  // 当前用户
  currentUser: { name: string };
  title: string;

  private subscription: Subscription | undefined;

  constructor(private router: Router,
              private basicService: BasicService) {
  }

  ngAfterViewInit(): void {
    const headerSrc = this.basicService.getHeaderImageSrc();
    this.headerHtmlRef.nativeElement.style.backgroundImage = `url("${headerSrc}")`;
  }

  ngOnInit(): void {
    this.title = this.basicService.getTitle();
    this.subscription = this.basicService.getCurrentLoginUser$()
      .subscribe(user => this.currentUser = user);
  }

  onLogout(): void {
    /**
     * complete 时跳转
     */
    this.basicService.logout();
  }

  ngOnDestroy(): void {
    if (isNotNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }
}