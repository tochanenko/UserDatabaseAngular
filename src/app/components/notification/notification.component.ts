import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Observable, mergeMap, tap } from 'rxjs';

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
export class NotificationComponent implements OnInit {
  visible: boolean = false;
  private visibleSeconds: number = 0;
  private NOTIFICATION_SECONDS: number = 5;

  notification$: Observable<string> = this.notificationService.getNotifications$().pipe(
    tap({
      next: () => this.makeVisible()
    })
  );

  ngOnInit(): void {
    setInterval(() => {
      if (this.visibleSeconds > 0) {
        this.visible = true;
        this.visibleSeconds--;
      } else this.visible = false;
    }, 1000);
  }

  makeVisible(): void {
    this.visibleSeconds = this.NOTIFICATION_SECONDS;
    this.visible = true;
  }

  constructor(private notificationService: NotificationService) {}
}
