import { UserType } from "./usertype.type";

export interface User {
	username: String,
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	user_type: UserType
}