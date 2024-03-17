import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.class';
import { PasswordStrengthDirective } from '../../directives/password-strength.directive';
import { CommonModule, NgIf } from '@angular/common';
import { MandatoryDirective } from '../../directives/mandatory.directive';
import { NameCharactersDirective } from '../../directives/name-characters.directive';

import sha from 'sha.js';
import { Observable, catchError, ignoreElements, mergeMap, of } from 'rxjs';
import { TextInputComponent } from '../text-input/text-input.component';
import { UserType } from '../../types/user-type.type';
import { NotificationService } from '../../services/notification.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import * as UserActions from '../../store/actions';
import { userSelector } from '../../store/selectors';

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

  userWithId$: Observable<User | undefined> | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.updateForm();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.updateForm();
  }

  onSubmit(): void {
    if (this.checkFormHasErrors()) {
      this.notificationService.showError("Form has errors");
      console.log("FIX ALL ERRORS!");
    } else if (this.user == null) {
      this.postNewUser();
    } else if (this.user.id != this.createUserForm.value.id) {
      this.deleteExistingPostUpdatedUser();
    } else {
      this.postUpdatedUser();
    }
  }

  checkUser(event: Event) {
    let newUserId = (event.target as HTMLInputElement).value;
    this.userWithId$ = this.store.select(userSelector(newUserId));
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

  deleteUser(): void {
    this.store.dispatch(UserActions.deleteUser({ id: this.createUserForm.get('id')?.value }));
    this.closeForm();
  }

  private updateForm() {
    if (this.user != null) {
      this.createUserForm.get('id')?.setValue(this.user.id);
      this.createUserForm.get('id')?.disable;
      this.createUserForm.get('first_name')?.setValue(this.user.first_name);
      this.createUserForm.get('last_name')?.setValue(this.user.last_name);
      this.createUserForm.get('email')?.setValue(this.user.email);
      this.createUserForm.get('user_type')?.setValue(this.user.user_type);
    } else {
      this.createUserForm.get('id')?.setValue('');
      this.createUserForm.get('id')?.enable;
      this.createUserForm.get('first_name')?.setValue('');
      this.createUserForm.get('last_name')?.setValue('');
      this.createUserForm.get('email')?.setValue('');
      this.createUserForm.get('user_type')?.setValue('');
    }
    this.createUserForm.get('password')?.setValue('');
    this.createUserForm.get('password_repeat')?.setValue('');
  }

  private checkFormHasErrors(): Boolean {
    let hasErrors = false;
    Object.keys(this.createUserForm.controls).forEach( (key: string | readonly (string | number)[]) => {
      if ((key == 'password' || key == 'password_repeat')
        && (this.createUserForm.get(key)?.hasError('empty') && this.user != null)
      ) {
        // Pass User Update if Password wasn't changed
      }
      else if (key != 'user_type' && this.createUserForm.get(key)?.errors != null) hasErrors = true;
    });
    if (this.createUserForm.get('password')!.value != this.createUserForm.get('password_repeat')!.value) hasErrors = true;
    return hasErrors;
  }

  private encodeString(text: string): string {
    return sha('sha256').update(text).digest('hex')
  }

  private postNewUser(): void {
    // TODO Remove User Service
    this.userService.getUsers().pipe(
      mergeMap( (users: User[]) => {
        let existingUser: User | undefined = users.find((user: User) => user.id == this.createUserForm.value.id);
        if (existingUser != null) {
          this.notificationService.showError("User created");
          return of(null);
        } else {
          let newUser = new User(
            this.createUserForm.value.id,
            this.createUserForm.value.first_name,
            this.createUserForm.value.last_name,
            this.createUserForm.value.email,
            this.encodeString(this.createUserForm.value.password!),
            this.createUserForm.value.user_type == '' ? 'DRIVER' : this.createUserForm.value.user_type
          );
          this.createUserForm.reset();
          // TODO Remove User Service
          return this.userService.postUser(newUser);
        }
      }),
      catchError((err) => {
        this.notificationService.showSuccess("Internal server error");
        return of(err);
      })
    ).subscribe( (user: User | null) => {
      if (user != null) {
        this.closeForm();
        this.notificationService.showSuccess("User created");
      }
    });
  }

  private deleteExistingPostUpdatedUser(): void {
    // TODO Remove User Service
    let updatedUser = this.composeUpdatedUser();
    this.userService.deleteUser(this.user!.id!).pipe(
      mergeMap(() => {
        this.createUserForm.reset();
        return this.userService.postUser(updatedUser);
      }),
      catchError((err) => {
        this.notificationService.showSuccess("Internal server error");
        return of(err);
      })
    ).subscribe( (user: User) => {
      this.notificationService.showSuccess("User updated");
      this.closeForm();
    });
  }

  private postUpdatedUser(): void {
    // TODO Remove User Service
    let updatedUser = this.composeUpdatedUser();
    this.userService.updateUser(updatedUser).pipe(
      catchError((err) => {
        this.notificationService.showSuccess("Internal server error");
        return of(err);
      })
    ).subscribe( (user: User) => {
      this.notificationService.showSuccess("User updated");
      this.closeForm();
    });
  }

  private composeUpdatedUser(): User {
    return new User(
      this.createUserForm.value.id,
      this.createUserForm.value.first_name,
      this.createUserForm.value.last_name,
      this.createUserForm.value.email,
      (this.createUserForm.value.password.empty && this.createUserForm.value.password_repeat.empty)
        ? this.user!.password : this.encodeString(this.createUserForm.value.password!),
      this.createUserForm.value.user_type
    );
  }
}
