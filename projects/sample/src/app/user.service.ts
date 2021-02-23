import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public getCurrentUsername(): Observable<string> {
    return this.httpClient.get<string>(`user/getCurrentUsername`);
  }

  public login(): Observable<void> {
    const params = new HttpParams()
      .append('username', 'panjie')
      .append('password', 'password');
    return this.httpClient.get<void>(`user/login`, {params});
  }

  public updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`user/${id}`, user);
  }
}
