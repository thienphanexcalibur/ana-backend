import {Schema, model, Model, Types, Document } from 'mongoose';
import User from './User';
import Post from './Post';
interface IComment extends Document {
	comment: string,
	byUser: string,
	liked: number,
	disliked: number,
	post: number,
}
const CommentSchema : Schema = new Schema({
			comment: String,
			byUser: {type: Types.ObjectId, refer: User},
			created_at: {
				type: Date,
				default: Date.now
			},
			updated_at: {
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
			post: {type: Types.ObjectId, refer: Post}
});
const CommentModel:Model<IComment> = model<IComment>('Comment', CommentSchema);
export default CommentModel;
