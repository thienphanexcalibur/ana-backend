import { Schema, model, Model, Types, Document } from 'mongoose';
import { PostModel } from './Post';

export interface IUser {
	username: string;
	password: string;
	fullname?: string;
	email?: string;
	mobile?: string;
	posts?: Schema.Types.ObjectId[];
	token?: string;
	avatar: string;
}
export const UserSchema: Schema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String
	},
	fullname: {
		type: String
	},
	bio: {
		type: String
	},
	email: {
		type: String
	},
	avatar: {
		type: String
	},
	mobile: {
		type: String
	},
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
	token: String
});
export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
