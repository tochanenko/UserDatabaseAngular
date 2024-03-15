import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'userlist',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent implements OnInit {
  // TODO Implement user Form Validation

  users: User[] = [];
  json = JSON;

  createUserForm = this.formBuilder.group({
    username: '',
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
    this.userService.postUser(new User(this.createUserForm.value)).subscribe( (user) => console.log(JSON.stringify(user, null, 4)));
    console.log(JSON.stringify(this.createUserForm.value, null, 4));
    this.createUserForm.reset();
  }
}
