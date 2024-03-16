import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.class';
import { PasswordStrengthDirective } from '../../directives/password-strength.directive';
import { CommonModule, NgIf } from '@angular/common';
import { MandatoryDirective } from '../../directives/mandatory.directive';
import { NameCharactersDirective } from '../../directives/name-characters.directive';

import sha from 'sha.js';
import { Observable, catchError, ignoreElements, mergeMap, of, throwError } from 'rxjs';
import { TextInputComponent } from '../text-input/text-input.component';
import { UserType } from '../../types/user-type.type';
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
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Output() finished = new EventEmitter<boolean>();

  json = JSON;
  createUserForm: FormGroup = this.formBuilder.group({
    id: this.user == null ? '' : this.user.id,
    first_name: new FormControl({ value: '', disabled: false}),
    last_name: new FormControl({ value: '', disabled: false}),
    email: new FormControl({ value: '', disabled: false}),
    user_type: new FormControl({ value: 'DRIVER' as UserType, disabled: false}),
    password: new FormControl({ value: '', disabled: false}),
    password_repeat: new FormControl({ value: '', disabled: false})
  });

  userWithId$: Observable<User> | null = null;
  userWithIdError$: Observable<User> | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.updateForm();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.updateForm();
  }

  onSubmit(): void {
    if (this.checkFormHasErrors()) {
      // TODO Implement Showing Error Message
      console.log("FIX ALL ERRORS!");
    } else {
      this.userService.getUsers().pipe(
        mergeMap( (users: User[]) => {
          let existingUser: User | undefined = users.find((user: User) => user.id == this.createUserForm.value.id);
          if (existingUser != null) {
            return of(null);
          } else {
            let newUser = new User(
              this.createUserForm.value.id,
              this.createUserForm.value.first_name,
              this.createUserForm.value.last_name,
              this.createUserForm.value.email,
              this.encodeString(this.createUserForm.value.password!),
              this.createUserForm.value.user_type
            );
            this.createUserForm.reset();
            return this.userService.postUser(newUser);
          }
        })
      ).subscribe( (user: User | null) => {
        if (user != null) {
          this.closeForm();
        }
        // TODO Implement Success / Error Message
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

  controlEmpty(controlName: string): boolean | null | undefined {
    if (this.createUserForm.get(controlName) == null) return null;
    return this.createUserForm.get(controlName)?.hasError('empty')
      && this.createUserForm.get(controlName)?.touched
  }

  controlNotEmptyHasError(controlName: string, errorName: string): boolean | null | undefined {
    if (this.createUserForm.get(controlName) == null) return null;
    return !this.createUserForm.get(controlName)?.hasError('empty')
      && this.createUserForm.get(controlName)?.touched
      && this.createUserForm.get(controlName)?.hasError(errorName)
  }

  hasErrors(controlName: string): boolean {
    let touched: boolean = this.createUserForm.get(controlName)!.touched;
    let errors: ValidationErrors | null = this.createUserForm.get(controlName)!.errors;

    if (controlName == 'password_repeat') {
      return touched && this.createUserForm.get('password')!.value != this.createUserForm.get('password_repeat')!.value;
    }

    if (errors == null) return false;
    return touched && (Object.keys(errors).length > 0);
  }

  closeForm(): void {
    this.finished.emit(true);
  }

  private updateForm() {
    if (this.user != null) {
      this.createUserForm.get('id')?.setValue(this.user.id);
      this.createUserForm.get('first_name')?.setValue(this.user.first_name);
      this.createUserForm.get('last_name')?.setValue(this.user.last_name);
      this.createUserForm.get('email')?.setValue(this.user.email);
      this.createUserForm.get('user_type')?.setValue(this.user.user_type);
      this.createUserForm.get('password')?.setValue('');
      this.createUserForm.get('password_repeat')?.setValue('');
    }
  }

  private checkFormHasErrors(): Boolean {
    let hasErrors = false;
    Object.keys(this.createUserForm.controls).forEach( (key: string | readonly (string | number)[]) => {
      if (this.createUserForm.get(key)?.errors != null) hasErrors = true;
    });
    return hasErrors;
  }

  private encodeString(text: string): string {
    return sha('sha256').update(text).digest('hex')
  }
}
