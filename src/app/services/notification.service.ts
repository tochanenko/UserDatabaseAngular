import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NotificationMessage, NotificationType } from '../types/notification.class';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new Subject<NotificationMessage>();

  public getNotifications$(): Observable<NotificationMessage> {
    return this.notifications$.asObservable();
  }

  public showError(message: string): void {
    this.showNotification(message, NotificationType.ERROR);
  }

  public showSuccess(message: string): void {
    this.showNotification(message, NotificationType.SUCCESS);
  }

  private showNotification(message: string, type: NotificationType) {
    this.notifications$.next(new NotificationMessage(message, type));
  }
}
