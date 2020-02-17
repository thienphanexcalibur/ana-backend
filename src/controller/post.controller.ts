import {Request, Response} from 'express';
import {Model, Document, Query, Types} from 'mongoose';
import AppController from '@controller/app.controller'
import {PostModel, IPost} from '@entity';
import {logger} from '@utils';

export class PostController<T extends Model<Document>> extends AppController<T> {
	constructor(model) {
		super(model);
		this.addPost = this.addPost.bind(this);
		this.editPost = this.editPost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.getPost = this.getPost.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	private async addComment(post: Types.ObjectId, commentId: Types.ObjectId): Promise<any> {
		const foundPost = await this.find(post);
		foundPost.comments.push(commentId);
		return foundPost.save();
	}

	async addPost(req: Request, res: Response, next: Function) {
		const {title, content, byUser} : IPost = req.body;
		try {
			const newPost = await this.add({title, content, byUser} as IPost);
			res.send(newPost);
		} catch(e) {
				res.send('failure');
				logger.log('error', e);
		}
	}

	async editPost(req: Request, res: Response, next: Function) {
		try {
			const {id} = req.params;
			const {title, content, byUser} = req.body;
			const modifiedPost:Query<Model<IPost>> = await this.modify(id, {title, content, updated_date: Date.now(), byUser});
			if (modifiedPost) {
				res.send(modifiedPost);
			}
		} catch (e) {
			res.send('failure');
			logger.log('error', e);
		}
	}

	async deletePost(req: Request, res: Response, next: Function) {
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
