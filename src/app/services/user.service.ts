import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.class';

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

  getUser(id: String): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/${id}`,  { headers: { Accept: 'application/json' } }
    );
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseUrl, user, { headers: { Accept: 'application/json' } }
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/${user.id}`, user, { headers: { Accept: 'application/json' } }
    );
  }

  deleteUser(user: User): Observable<unknown> {
    return this.http.delete(
      `${this.baseUrl}/${user.id}`, { headers: { Accept: 'application/json' } }
    );
  }
}
