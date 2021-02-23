import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Error';

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
  }

}
