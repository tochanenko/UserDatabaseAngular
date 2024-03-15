import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

import sha from 'sha.js';

@Component({
  selector: 'userform',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.scss'
})
export class UserformComponent {
  // TODO Implement user Form Validation

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
