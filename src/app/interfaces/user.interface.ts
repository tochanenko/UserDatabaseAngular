import { UserType } from "./usertype.type";

export class User {

	public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

	public username: String | null | undefined = null;
	public first_name: String | null | undefined = null;
	public last_name: String | null | undefined = null;
	public email: String | null | undefined = null;
	public password: String | null | undefined = null;
	public user_type: UserType | null | undefined = null;
}