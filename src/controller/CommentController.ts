import { Request, Response, NextFunction } from 'express';
import { Model, Document, Schema } from 'mongoose';
import AppController from '@controller/app.controller';
import { PostController } from '@controller';
import {
	PostModel, IComment, IUser, IPost,
} from '@entity';
import { ObjectId } from 'mongodb';

export class CommentController<T extends Model<Document>> extends AppController<T> {
	public model: T;

	public postController: PostController<Model<Document>>

	constructor(model: T) {
		super(model);
		this.addComment = this.addComment.bind(this);
		this.editComment = this.editComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.postController = new PostController(PostModel);
	}

	async addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { comment, byUser, post }: IComment = req.body;
		try {
			const newComment = await this.add({ comment, byUser, post }) as IComment;
			const newCommentId: Schema.Types.ObjectId = newComment._id;
			const updatedCommentPost = await this.postController.addComment(post, newCommentId);
			if (newComment && updatedCommentPost) {
				res.sendStatus(200).send(newComment);
			} else {
				throw (this._Error({
					statusCode: 500,
					m: 'Failed to save comment',
				}));
			}
		} catch (e) {
			next(e);
		}
	}

	async editComment(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const { title, content } = req.body;
			// eslint-disable-next-line max-len
			const modifiedPost = await this.modify(id, { title, content, updated_date: Date.now() }) as IPost;
			if (modifiedPost) {
				res.sendStatus(200).send(modifiedPost);
			}
		} catch (e) {
			next(e);
		}
	}

	async deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		try {
			const deletedPost = await this.remove(id) as IPost;
			if (deletedPost) {
				res.sendStatus(200);
			} else {
				throw (new Error('error'));
			}
		} catch (e) {
			next(e);
		}
	}
}
