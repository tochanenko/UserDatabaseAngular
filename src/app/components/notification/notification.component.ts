import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'notification',
  standalone: true,
  imports: [
    NgIf,
    CommonModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  notification$: Observable<string> = this.notificationService.getNotifications$();

  constructor(private notificationService: NotificationService) {}
}
