import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`user/${id}`, user);
  }
}
