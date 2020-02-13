import {PostModel, IPost} from '@entity';
import {Request, Response} from 'express';
export class PostController {
		constructor() {
			this.add = this.add.bind(this);
			this.edit = this.edit.bind(this);
			this.delete = this.delete.bind(this);
		}

		async add(req: Request, res: Response, next: Function) {
			const {title, content, byUser} : IPost = req.body;
			await new PostModel({title, content, byUser})
		}

		async edit(req: Request, res: Response, next: Function) {
			const {id} = req.params;
			const {title, content} = req.body;
			await PostModel.findByIdAndUpdate(id, {title, content}).exec();

		}

		async delete(req: Request, res: Response, next: Function) {
			const {id} = req.params;
			PostModel.findByIdAndDelete(id)
		}
}
