import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { NgIf } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';
import { User } from '../../types/user.class';

@Component({
  selector: 'user-page',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    UserListComponent,
    UserFormComponent,
    NgIf
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  createFormVisibility: boolean = false;
  userToEdit: User | null = null;

  showUserCreateForm(): void {
    this.userToEdit = null;
    this.createFormVisibility = true;
  }

  closeForm(event: boolean) {
    this.createFormVisibility = false;
  }

  selectUser(event: User) {
    console.log(JSON.stringify(event, null, 4));
    this.userToEdit = event;
    this.createFormVisibility = true;
  }
}
