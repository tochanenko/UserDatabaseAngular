import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.class';
import { PasswordStrengthDirective } from '../../directives/password-strength.directive';
import { CommonModule, NgIf } from '@angular/common';
import { MandatoryDirective } from '../../directives/mandatory.directive';
import { NameCharactersDirective } from '../../directives/name-characters.directive';

import sha from 'sha.js';
import { Observable, catchError, ignoreElements, mergeMap, of } from 'rxjs';
import { TextInputComponent } from '../text-input/text-input.component';
@Component({
  selector: 'user-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PasswordStrengthDirective,
    MandatoryDirective,
    NameCharactersDirective,
    NgIf,
    CommonModule,
    TextInputComponent,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  json = JSON;
  createUserForm = this.formBuilder.group({
    id: '',
    first_name: new FormControl({ value: '', disabled: false}),
    last_name: '',
    email: '',
    user_type: new FormControl(null),
    password: '',
    password_repeat: ''
  });

  userWithId$: Observable<User> | null = null;
  userWithIdError$: Observable<User> | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    if (this.checkFormHasErrors()) {
      // TODO Implement Showing Error Message
      console.log("FIX ALL ERRORS!");
    } else {
      this.userService.getUser(this.createUserForm.value.id!).pipe(
        mergeMap( (user: User | null) => {
          if (user == null) {
            let newUser = new User(
              this.createUserForm.value.id,
              this.createUserForm.value.first_name,
              this.createUserForm.value.last_name,
              this.createUserForm.value.email,
              sha('sha256').update(this.createUserForm.value.password!).digest('hex'),
              this.createUserForm.value.user_type
            );

            this.createUserForm.reset();
          
            return this.userService.postUser(newUser);
          } else { return of({}) }
        })
      ).subscribe( (user: any) => {
        // TODO Implement Showing Error Message
        console.log(JSON.stringify(user, null, 4));
      });
      
    }
  }

  checkUser(event: Event) {
    let newUserId = (event.target as HTMLInputElement).value;
    this.userWithId$ = this.userService.getUser(newUserId);
    this.userWithIdError$ = this.userWithId$.pipe(
      ignoreElements(),
      catchError((err) => of(err))
    );
  }

  private checkFormHasErrors(): Boolean {
    let hasErrors = false;
    Object.keys(this.createUserForm.controls).forEach( (key: string | readonly (string | number)[]) => {
      if (this.createUserForm.get(key)?.errors != null) hasErrors = true;
    });
    return hasErrors;
  }
}
