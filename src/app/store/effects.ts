import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import * as UserActions from './actions';
import { first, forkJoin, map, mergeMap, switchMap } from "rxjs";
import { User } from "../types/user.class";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class UserEffects {
	constructor(
		private actions$: Actions,
		private userService: UserService,
		private notificationService: NotificationService
	) {}

	loadUsers$: any = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.getUsers),
			mergeMap(() => this.userService.getUsers().pipe(
				map((users: User[]) => UserActions.getUsersSuccess( {users} ))
			))
		)
	});

	deleteUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.deleteUser),
			switchMap(action =>
				this.userService.deleteUser(action.id).pipe(
					first(),
					map(() => {
						this.notificationService.showSuccess("User deleted");
						return UserActions.deleteUserSuccess();
					})
				)
			)
		)
	);

	postUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.postUser),
			switchMap(action =>
				this.userService.postUser(action.user).pipe(
					first(),
					map(() => {
						this.notificationService.showSuccess("User created");
						return UserActions.postUserSuccess();
					})
				)
			)
		)
	);

	updateUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.updateUser),
			switchMap(action =>
				this.userService.updateUser(action.user).pipe(
					first(),
					map(() => {
						this.notificationService.showSuccess("User updated");
						return UserActions.updateUserSuccess();
					})
				)
			)
		)
	);

	updateUserChangedId$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.updateUserChangeId),
			switchMap(action =>
				forkJoin({
					updateUserResponse: this.userService.postUser(action.user),
					deleteUserResponse: this.userService.deleteUser(action.id)
				}).pipe(
					first(),
					map(() => {
						this.notificationService.showSuccess("User updated");
						return UserActions.updateUserChangeIdSuccess();
					}),
      			)
    		)
  		)
	);
}