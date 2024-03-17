import { createAction, props } from "@ngrx/store";
import { User } from "../types/user.class";

export const getUsers = createAction('[User] Get all Users');
export const getUsersSuccess = createAction('[User] Successfully loaded Users', props<{ users: User[] }>());
export const getUser = createAction('[User] Get User');
export const postUser = createAction('[User] Create User', props<{ user: User }>());
export const postUserSuccess = createAction('[User] Successfully created User');
export const deleteUser = createAction('[User] Remove User', props<{ id: string }>());
export const deleteUserSuccess = createAction('[User] Successfully deleted User');
export const updateUser = createAction('[User] Update User', props<{ user: User}>());
export const updateUserSuccess = createAction('[User] Successfully updated User', props<{ user: User}>());