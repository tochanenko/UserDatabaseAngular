import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new Subject<string>();

  public getNotifications$(): Observable<string> {
    return this.notifications$.asObservable();
  }

  public showError(message: string): void {
    this.notifications$.next(message);
  }
}
