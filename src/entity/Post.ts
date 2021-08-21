/* eslint-disable camelcase */
import { Schema, Document, model, Model, Types } from 'mongoose';
// eslint-disable-next-line import/no-unresolved
import Controller from '@/controller/controller';

const controller = new Controller();

export interface IPost extends Document {
	title: string;
	content: string;
	created_date?: number;
	updated_date?: number;
	thumbnail: string;
	liked: number;
	disliked: number;
	byUser: Types.ObjectId;
	comments?: Types.ObjectId[];
}
const PostSchema: Schema = new Schema({
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
	thumbnail: {
		type: String,
		default: ''
	},
	byUser: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

export const PostModel: Model<IPost> = model<IPost>('Post', PostSchema);
