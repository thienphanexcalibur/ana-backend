import {Request, Response, NextFunction} from 'express';
import {Model, Document, Query} from 'mongoose';
import AppController from '@controller/app.controller'
import {PostController} from '@controller';
import {PostModel} from '@entity';
import {CommentModel, IComment} from '@entity';
import {logger} from '@utils';

export class CommentController<T extends Model<Document>> extends AppController<T> {
	postController: any
	constructor(model) {
		super(model);
		this.addComment = this.addComment.bind(this);
		this.editComment = this.editComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.postController = new PostController(PostModel);
	}

	async addComment(req: Request, res: Response, next: NextFunction) {
		const {comment, byUser, post} : IComment = req.body;
		try {
			const newComment: IComment = await this.add({comment, byUser, post} as IComment);
			const newCommentId: string = newComment._id;
			const updatedCommentPost = await this.postController.addComment(post, newCommentId);
			if (newComment && updatedCommentPost) {
				res.sendStatus(200).send(newComment);
			} else {
				throw(this._Error({
					statusCode: 500,
					m: 'Failed to save comment'
			}));
			}
		} catch(e) {
			next(e);
		}
	}

	async editComment(req: Request, res: Response, next: NextFunction) {
		try {
			const {id} = req.params;
			const {title, content} = req.body;
			const modifiedPost:Query<Model<IComment>> = await this.modify(id, {title, content, updated_date: Date.now()});
			if (modifiedPost) {
			res.sendStatus(200).send(modifiedPost);
			}
		} catch (e) {
			next(e);
		}
	}

	async deleteComment(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params;
		try {
			const deletedPost = await this.remove(id);
			if (deletedPost) {
			res.sendStatus(200);
			} else {
			throw(new Error('error'));
			}
		} catch(e) {
			next(e);
		}
	}

	async getPost(req: Request, res: Response, next: NextFunction) {
		const {id} = req.params;
		try {
			const post = await this.find(id);
			if (post) {
				res.sendStatus(200).send(post);
			} else {
			res.sendStatus(404);
			}
		} catch(e) {
			next(e);
		}
	}
}
