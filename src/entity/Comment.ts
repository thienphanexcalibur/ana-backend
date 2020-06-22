import {Schema, model, Model, Types, Document } from 'mongoose';
import {UserModel} from './User';
import {PostModel} from './Post';

export interface IComment extends Document {
	comment: string,
	byUser: Types.ObjectId,
	liked: number,
	disliked: number,
	post: Types.ObjectId,
}

const CommentSchema : Schema = new Schema({
	comment: String,
	byUser: {
		type: Types.ObjectId,
		refer: UserModel
	},
	liked: {
		type: Number,
		default: 1
	},
	disliked: {
		type: Number,
		default: 0
	},
	post: {type: Types.ObjectId, refer: PostModel}
}, {timestamps:true});

export const CommentModel:Model<IComment> = model<IComment>('Comment', CommentSchema);
