import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:3000/users"

  constructor(private http: HttpClient) {  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseUrl, { headers: { Accept: 'application/json' } }
    );
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseUrl, user, { headers: { Accept: 'application/json' } }
    )
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}\\${user.id}`, user, { headers: { Accept: 'application/json' } }
    )
  }
}
