import {Request, Response} from 'express';
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

	async addComment(req: Request, res: Response, next: Function) {
		const {comment, byUser, post} : IComment = req.body;
		try {
			const newComment = await this.add({comment, byUser, post} as IComment);
			const newCommentId = newComment._id;
			const updatedCommentPost = await this.postController.addComment(post, newCommentId);
			res.send('success');
		} catch(e) {
				res.send('failure');
				logger.log('error', e);
		}
	}

	async editComment(req: Request, res: Response, next: Function) {
		try {
			const {id} = req.params;
			const {title, content} = req.body;
			const modifiedPost:Query<Model<IComment>> = await this.modify(id, {title, content, updated_date: Date.now()});
			if (modifiedPost) {
				res.send(modifiedPost);
			}
		} catch (e) {
			res.send('failure');
			logger.log('error', e);
		}
	}

	async deleteComment(req: Request, res: Response, next: Function) {
		const {id} = req.params;
		try {
			const deletedPost = await this.remove(id);
			if (deletedPost) {
				res.send('success');
			} else {
				res.sendStatus(404);
			}
		} catch(e) {
			res.send('failure');
			logger.log('error', e);
		}
	}

	async getPost(req: Request, res: Response, next: Function) {
		const {id} = req.params;
		try {
			const post = await this.find(id);
			if (post) {
				res.send(post);
			} else {
				res.sendStatus(404);
			}
		} catch(e) {
			logger.log(e);
		}
	}
}
