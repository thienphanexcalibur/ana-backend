import {Schema, model, Model, Types, Document } from 'mongoose';
import {PostModel} from './Post';
interface IUser extends Document {
	username: string,
	password: string,
	fullname?: string,
	email?: string,
	mobile?: string,
	posts?: string[],
	token: string
}
const UserSchema : Schema = new Schema({
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
			email: {
				type: String
			},
			mobile: {
				type: String
			},
			posts: [{type: Types.ObjectId, ref: PostModel}],
			token: String
});
export const UserModel:Model<IUser> = model<IUser>('User', UserSchema);
