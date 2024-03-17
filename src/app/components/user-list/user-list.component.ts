import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.class';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AppState } from '../../store/store';
import { Store } from '@ngrx/store';
import { usersSelector } from '../../store/selectors';
import * as UserActions from '../../store/actions';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  users$: Observable<User[]>;

  @Output() selectedUser = new EventEmitter<User>();

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.users$ = this.store.select(usersSelector);
    this.store.dispatch(UserActions.getUsers());
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    })
  }

  selectUser(user: User) {
    console.log("Selected user: " + user.id);
    this.selectedUser.emit(user);
  }
}
