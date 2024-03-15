import { UserType } from "./usertype.type";

export class User {
	public constructor(
		id: String | null | undefined,
		first_name: String | null | undefined,
		last_name: String | null | undefined,
		email: String | null | undefined,
		password: String | null | undefined,
		user_type: UserType | null | undefined
	) {
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.password = password;
		this.user_type = user_type;
	}

	public id: String | null | undefined = null;
	public first_name: String | null | undefined = null;
	public last_name: String | null | undefined = null;
	public email: String | null | undefined = null;
	public password: String | null | undefined = null;
	public user_type: UserType | null | undefined = null;
}