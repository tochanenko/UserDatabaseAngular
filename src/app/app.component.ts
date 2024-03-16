import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgIf } from '@angular/common';

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

  showUserCreateForm(): void {
    this.createFormVisibility = true;
  }

  closeForm(event: boolean) {
    this.createFormVisibility = false;
  }
}
