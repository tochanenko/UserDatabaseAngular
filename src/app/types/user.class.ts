import { UserType } from "./user-type.type";

export class User {
	public constructor(
		id: string | null | undefined,
		first_name: string | null | undefined,
		last_name: string | null | undefined,
		email: string | null | undefined,
		password: string | null | undefined,
		user_type: UserType | null | undefined
	) {
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.password = password;
		this.user_type = user_type;
	}

	public id: string | null | undefined = null;
	public first_name: string | null | undefined = null;
	public last_name: string | null | undefined = null;
	public email: string | null | undefined = null;
	public password: string | null | undefined = null;
	public user_type: UserType | null | undefined = null;
}