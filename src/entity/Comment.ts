import {
	Schema, model, Model, Types, Document,
} from 'mongoose';

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
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	liked: {
		type: Number,
		default: 1,
	},
	disliked: {
		type: Number,
		default: 0,
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
	updated_date: {
		type: Date,
		default: Date.now,
	},
	post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

export const CommentModel:Model<IComment> = model<IComment>('Comment', CommentSchema);
