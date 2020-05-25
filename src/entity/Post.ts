import {Schema, Document, model, Model, Types } from 'mongoose';
export interface IPost extends Document {
	title: string,
	content: string,
	created_date?: number,
	updated_date?: number,
	byUser: string,
	comments?: Types.ObjectId[]
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
		type: Date,
		default: Date.now
	},
	liked: {
		type: Number,
		default: 1
	},
	disliked: {
		type: Number,
		default: 0
	},
	byUser: {type: Types.ObjectId, ref: 'User'},
	comments: [{type: Types.ObjectId, ref: 'Comment'}]
});
export const PostModel:Model<IPost> = model<IPost>('Post', PostSchema);
