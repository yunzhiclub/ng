import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../entity/user';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {environment} from '../../../../environments/environment';
import {isNotNullOrUndefined} from '../../../../common/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // 当前用户
  currentUser: User | undefined;

  environment = environment;

  private subscription: Subscription | undefined;

  constructor(private router: Router,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.getCurrentLoginUser$()
      .subscribe(user => this.currentUser = user);
  }

  onLogout(): void {
    /**
     * complete 时跳转
     */
    this.userService.logout()
      .subscribe(() => {
        }, (error) => {
          console.error('error', error);
        },
        () => {
          this.router.navigateByUrl('login').then();
        }
      );
  }

  ngOnDestroy(): void {
    if (isNotNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }
}
