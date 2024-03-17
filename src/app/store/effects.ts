import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import * as UserActions from './actions';
import { map, mergeMap, switchMap } from "rxjs";
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
			switchMap(action => {
				this.notificationService.showSuccess("User deleted");
				return this.userService.deleteUser(action.id).pipe(
					map(() => UserActions.deleteUserSuccess())
				)
			})
		)
	);

	postUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.postUser),
			switchMap(action => {
				this.notificationService.showSuccess("User created");
				return this.userService.postUser(action.user).pipe(
					map(() => UserActions.postUserSuccess())
				)
			})
		)
	);
}