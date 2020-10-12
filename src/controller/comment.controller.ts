import { Request, Response, NextFunction } from 'express';
import { Model, Document, Types } from 'mongoose';
import AppController from '@controller/app.controller';
import { PostController } from '@controller';
import {
	PostModel, IComment, IUser, IPost,
} from '@entity';

export class CommentController extends AppController {
	public model : Model<Document>

	postController: PostController

	constructor(model: Model<Document>) {
		super(model);
		this.addComment = this.addComment.bind(this);
		this.editComment = this.editComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.postController = new PostController(PostModel);
	}

	async addComment(req: Request, res: Response, next: NextFunction) : Promise<void> {
		const { comment, byUser, post } : IComment = req.body;
		try {
			const newComment = await this.add({ comment, byUser, post } as IComment) as IComment;
			const newCommentId : Types.ObjectId = newComment._id;
			const updatedCommentPost = await this.postController.addComment(post, newCommentId);
			if (newComment && updatedCommentPost) {
				res.send(newComment);
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

	async editComment(req: Request, res: Response, next: NextFunction) : Promise<void> {
		try {
			const { id } = req.params;
			const { title, content } = req.body;
			// eslint-disable-next-line max-len
			const modifiedPost : Document = await this.modify(id, { title, content, updated_date: Date.now() });
			if (modifiedPost) {
				res.sendStatus(200).send(modifiedPost);
			}
		} catch (e) {
			next(e);
		}
	}

	async deleteComment(req: Request, res: Response, next: NextFunction) : Promise<void> {
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

	async getPost(req: Request, res: Response, next: NextFunction) : Promise<void> {
		const { id } = req.params;
		try {
			const post = await this.find(id) as IUser[];
			if (post) {
				res.sendStatus(200).send(post);
			} else {
				res.sendStatus(404);
			}
		} catch (e) {
			next(e);
		}
	}
}
