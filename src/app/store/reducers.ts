import { createReducer, on } from "@ngrx/store";
import { User } from "../types/user.class";
import * as UserActions from './actions';

export interface UserState {
	users: User[];
}

export const initialState: UserState = {
	users: []
};

export const userReducer = createReducer(
	initialState,
	on(
		UserActions.getUser,
		state => ({ ...state })
	),
	on(
		UserActions.getUsersSuccess,
		(state, { users }) => ({
			...state,
			users
		})
	),
	on(
		UserActions.getUsers,
		state => ({ ...state })
	),
	on (
		UserActions.postUser,
		(state, { user }) => ({
			...state,
			users: [...state.users, user]
		})
	),
	on(
		UserActions.deleteUser,
		(state, { id }) => ({
			...state,
			users: state.users.filter( it => it.id != id)
		})
	),
	on(
		UserActions.updateUser,
		(state, { user }) => ({
			...state,
			users: state.users.map(it => it.id === user.id ? user : it)
		})
	)
);