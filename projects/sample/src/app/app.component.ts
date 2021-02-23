import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username = '';
  title = 'Loading';
  loginResult = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    const observer = this.userService.updateUser(12, {id: 234, name: 'test'});
    observer.subscribe(user => {
      this.title = `${user.id}:${user.name}`;
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('complete');
    });

    this.userService.getCurrentUsername()
      .subscribe(d => this.username = d);

    this.userService.login()
      .subscribe(() => {
        this.loginResult = 'success';
      }, (error) => {
        console.log('成功接收到登录失败信息');
        console.log(error);
        this.loginResult = 'fail';
      });

    this.userService.delete(1);
  }
}
