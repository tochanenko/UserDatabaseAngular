import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:3000"

  constructor(private http: HttpClient) {  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseUrl + '/users', { headers: { Accept: 'application/json' } }
    );
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseUrl + '/users', user, { headers: { Accept: 'application/json' } }
    )
  }
}
