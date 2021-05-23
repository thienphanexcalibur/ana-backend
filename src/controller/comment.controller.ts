import { logger } from '@/utils';
import { AppController } from '@controller';
import { CommentModel, IComment, IPost, IUser, PostModel } from '@entity';
import { NextFunction, Request, Response } from 'express';
import { Document, Model } from 'mongoose';

export default class CommentController extends AppController {
	public model: Model<Document>;

	constructor(model: Model<Document>) {
		super(model);
		this.addComment = this.addComment.bind(this);
		this.editComment = this.editComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
	}

	async addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { comment, byUser, post: postId }: IComment = res.locals.body;
		try {
			const newComment = (await CommentModel.create({
				comment,
				byUser,
				post: postId
			} as IComment)) as IComment;
			const foundPost = await PostModel.findById(postId);
			foundPost.comments.push(newComment._id);
			await foundPost.save();
			res.status(200).send(newComment);
			next();
		} catch (e) {
			res.status(500).send(e.message);
			logger.log('error', {
				message: e.message,
				stack: e.stack
			});
		}
	}

	async editComment(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const { title, content } = req.body;
			// eslint-disable-next-line max-len
			const modifiedPost: Document = await this.modify(id, {
				title,
				content,
				updated_date: Date.now()
			});
			if (modifiedPost) {
				res.status(200).send(modifiedPost);
			}
		} catch (e) {
			next(e);
		}
	}

	async deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		try {
			const deletedPost = (await this.remove(id)) as IPost;
			if (deletedPost) {
				res.sendStatus(200);
			} else {
				throw new Error('error');
			}
		} catch (e) {
			next(e);
		}
	}

	async getComments(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		try {
			const comments = await PostModel.findById(id, 'comments -_id').populate({
				path: 'comments',
				select: '-post',
				options: {
					sort: {
						created_date: -1
					}
				},
				populate: {
					model: 'User',
					path: 'byUser',
					select: 'username _id'
				}
			});
			res.status(200).send(comments.comments);
			next();
		} catch (e) {
			res.status(500).send(e.message);
			logger.log('error', {
				message: e.message,
				stack: e.stack
			});
		}
	}
}
