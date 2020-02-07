import {Schema, Document, model, Model, Types } from 'mongoose';
import {UserModel} from './User';
import {CommentModel} from './Comment';
interface IPost extends Document {
		title: string,
		content: string,
		created_date: number, updated_date: number,
		byUser: string,
		comments: Types.ObjectId[]
}
const PostSchema : Schema = new Schema({
		title: {
			type: String
		},
		content: {
			type: String
		},
		created_date: {
			type: Date,
			default: Date.now
		},
		updated_date: {
			type: Date
		},
		byUser: {type: Types.ObjectId, ref: 'User'},
		comments: [{type: Types.ObjectId, ref: 'Comment'}]
});
export const PostModel:Model<IPost> = model<IPost>('Post', PostSchema);
