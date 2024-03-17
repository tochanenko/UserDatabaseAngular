import { Action, ActionReducer } from "@ngrx/store";
import { UserState, userReducer } from "./reducers";
import { UserEffects } from "./effects";

export interface AppState {
	users: UserState;
}

export interface AppStore {
	users: ActionReducer<UserState, Action>;
}

export const appStore: AppStore = {
	users: userReducer
}

export const appEffects = [UserEffects];