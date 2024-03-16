import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgIf } from '@angular/common';
import { User } from './types/user.class';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    UserListComponent,
    UserFormComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UserDatabaseAngular';
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
