import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import { YzSorts, YzSortsAndParams } from 'packages/common/src/public-api';


interface User {
  id: number,
  name: string,
  username: string;
}

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username = '';
  title = 'Loading';
  loginResult = '';
  networkErrorPass = false;
  sorts = {id: 'desc'} as YzSorts<User>;

  constructor(private userService: UserService, private httpClient: HttpClient) {
  }

  onSortChange(sorts: YzSortsAndParams<User>) {
    this.sorts = sorts.sorts;
    console.log(this.sorts);
    const httpParams = new HttpParams().appendAll({sort: sorts.params});
    this.httpClient.get('test', {params: httpParams}).subscribe();
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
      .subscribe(d => {
        this.username = d;
        if (this.username === 'yunzhi') {
          console.log('getCurrentUsername 路由正确');
        } else {
          console.error('getCurrentUsername 路由错误');
        }
      });

    this.httpClient.get<{id: number}>('/user/123')
      .subscribe(user => {
        if (user.id !== 123) {
          console.error('路由错误');
        } else {
          console.log('路由正确');
        }
      });
    this.userService.login()
      .subscribe(() => {
        this.loginResult = 'success';
      }, (error) => {
        console.log('成功接收到登录失败信息');
        console.log(error);
        this.loginResult = 'fail';
      });

    this.userService.delete(1);

    this.userService.error().subscribe(() => {
      },
      (error) => {
        this.networkErrorPass = true;
        console.log('网络错误', error);
      },
      () => console.log('complete error'));

    this.httpClient.get(`assets/basic/image/header.png`, {responseType: 'arraybuffer'}).subscribe(data => {
      console.log('成功请求到以assets打头的图片信息', data);
    })
  }
}
