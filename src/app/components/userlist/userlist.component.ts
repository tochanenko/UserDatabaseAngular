import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

import sha from 'sha.js';

@Component({
  selector: 'userlist',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent implements OnInit {
  // TODO Implement user Form Validation

  users: User[] = [];
  json = JSON;

  createUserForm = this.formBuilder.group({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    user_type: new FormControl(null),
    password: '',
    password_repeat: ''
  })

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    })
  }

  onSubmit(): void {
    let newUser = new User(
      this.createUserForm.value.id,
      this.createUserForm.value.first_name,
      this.createUserForm.value.last_name,
      this.createUserForm.value.email,
      sha('sha256').update(this.createUserForm.value.password!).digest('hex'),
      this.createUserForm.value.user_type
    );
  
    this.userService.postUser(newUser).subscribe( (user) => console.log(JSON.stringify(user, null, 4)));
    this.createUserForm.reset();
  }
}
