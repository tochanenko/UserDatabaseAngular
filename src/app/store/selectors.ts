import { createSelector } from "@ngrx/store";
import { AppState } from "./store";
import { UserState } from "./reducers";

const users = (state: AppState) => state.users;

export const usersSelector = createSelector(
	users,
	(state: UserState) => state.users
)

export const userSelector = (id: string) => createSelector(
	users,
	(state: UserState) => state.users.find( it => it.id == id)
)
