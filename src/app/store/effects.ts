import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import * as UserActions from './actions';
import { map, mergeMap } from "rxjs";
import { User } from "../types/user.class";

@Injectable()
export class UserEffects {
	loadUsers$: any = createEffect(() => {
		return this.actions$.pipe(
			ofType(UserActions.getUsers),
			mergeMap(() => this.userService.getUsers().pipe(
				map((users: User[]) => UserActions.getUsersSuccess( {users} ))
			))
		)
	});

	constructor(
		private actions$: Actions,
		private userService: UserService
	) {}
}