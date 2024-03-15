import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'userlist',
  standalone: true,
  imports: [NgFor],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent implements OnInit {
  users: User[] = [];

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
}
