import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../types/user.class';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:3000/users"

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.baseUrl, { headers: { Accept: 'application/json' } }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorNotification(error);
        return throwError(() => error);
      })
    );
  }

  getUser(id: String): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/${id}`,  { headers: { Accept: 'application/json' } }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorNotification(error);
        return throwError(() => error);
      })
    );
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.baseUrl, user, { headers: { Accept: 'application/json' } }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorNotification(error);
        return throwError(() => error);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/${user.id}`, user, { headers: { Accept: 'application/json' } }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorNotification(error);
        return throwError(() => error);
      })
    );
  }

  deleteUser(id: string): Observable<unknown> {
    console.log(`Deleting user: [${id}]`);
    return this.http.delete(
      `${this.baseUrl}/${id}`, { headers: { Accept: 'application/json' } }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorNotification(error);
        return throwError(() => error);
      })
    );
  }

  private showErrorNotification(error: HttpErrorResponse) {
    if (500 <= error.status && error.status <= 600) {
      this.notificationService.showError("Internal server error");
    }
    if (error.status == 0) {
      this.notificationService.showError("User service not available");
    }
  }
}
