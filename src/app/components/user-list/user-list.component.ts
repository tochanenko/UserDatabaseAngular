import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.class';
import { NgFor } from '@angular/common';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  @Output() selectedUser = new EventEmitter<User>();

  constructor(
    private userService: UserService,
  ) {}

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
