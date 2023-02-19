export interface IUser {
	username: string;
	password: string;
	token: string;
}

export interface TaskType {
	title: string;
	description? : string;
	user: Types.ObjectId;
	status: string;
}