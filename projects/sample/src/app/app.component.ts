import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sample';


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.updateUser(12, {id: 234, name: 'test'})
      .subscribe(user => this.title = `${user.id}:${user.name}`);
  }

}
