import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

import sha from 'sha.js';
import { PasswordStrengthDirective } from '../../directives/password-strength.directive';
import { NgIf } from '@angular/common';
import { MandatoryDirective } from '../../directives/mandatory.directive';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PasswordStrengthDirective,
    MandatoryDirective,
    NgIf,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
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
    console.log(this.checkFormHasErrors());
    if (this.checkFormHasErrors()) {
      console.log("FIX ALL ERRORS!");
    } else {
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

  private checkFormHasErrors(): Boolean {
    let hasErrors = false;
    Object.keys(this.createUserForm.controls).forEach( (key: string | readonly (string | number)[]) => {
      if (this.createUserForm.get(key)?.errors != null) hasErrors = true;
      console.log(key + " - " + JSON.stringify(this.createUserForm.get(key)?.errors, null, 4));
    });
    return hasErrors;
  }
}
