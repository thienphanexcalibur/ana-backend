import {
	Request, Response, NextFunction,
} from 'express';
import {
	Model, Document, Query, Types, Schema,
} from 'mongoose';
import AppController from '@controller/app.controller';
import { PostModel, IPost, IComment } from '@entity';
import { logger } from '@utils';

export class PostController<T extends Model<Document>> extends AppController<T> {
	public model: T

	constructor(model: T) {
		super(model);
		this.addPost = this.addPost.bind(this);
		this.editPost = this.editPost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.getPost = this.getPost.bind(this);
		this.getAllPost = this.getAllPost.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	async addComment(postId: Types.ObjectId, commentId: Schema.Types.ObjectId): Promise<IPost> {
		const foundPost : IPost = await (this.find(postId).exec() as Promise<IPost>);
		foundPost.comments.push(commentId);
		const savedPost : IPost = await (foundPost.save());
		return savedPost;
	}

	async addPost(req: Request, res: Response) : Promise<void> {
		const { title, content, byUser } : IPost = req.body;
		try {
			const newPost = await this.add({ title, content, byUser } as IPost);
			res.send(newPost);
		} catch (e) {
			res.send('failure');
			logger.log('error', e);
		}
	}

	async getAllPost(req: Request, res: Response) : Promise<void> {
		try {
			const posts = await this.find().populate('byUser', 'fullname').populate('comments').exec();
			res.send(posts);
		} catch (e) {
			res.send('failure');
			logger.log('error', e);
		}
	}

	async editPost(req: Request, res: Response) : Promise<void> {
		try {
			const { id } = req.params;
			const { title, content, byUser } = req.body;
			const modifiedPost = await this.modify(id, {
				title, content, updated_date: Date.now(), byUser,
			}) as IPost;

			if (modifiedPost) {
				res.send(modifiedPost);
			}
		} catch (e) {
			res.send('failure');
			logger.log('error', e);
		}
	}

	async deletePost(req: Request, res: Response, next: NextFunction) : Promise<void> {
		const { id } = req.params;
		try {
			const deletedPost = await this.remove(id);
			if (deletedPost) {
				res.send('success');
			} else {
				res.sendStatus(404);
			}
		} catch (e) {
			res.send('failure');
			logger.log('error', e);
		}
	}

	async getPost(req: Request, res: Response, next: NextFunction) : Promise<void> {
		const { id } = req.params;
		try {
			const post = await this.find(id);
			if (post) {
				res.send(post);
			} else {
				res.sendStatus(404);
			}
		} catch (e) {
			logger.log(e);
		}
	}
}
