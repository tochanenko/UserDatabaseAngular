import { createAction, props } from "@ngrx/store";
import { User } from "../types/user.class";

export const getUsers = createAction('[User] Get all Users');
export const getUsersSuccess = createAction('[User] Successfull loading Users', props<{ users: User[] }>());
export const getUser = createAction('[User] Get User');
export const removeUser = createAction('[User] Remove User', props<{ id: string }>());
export const updateUser = createAction('[User] Update User', props<{ user: User}>());