import { UserModel } from '@/entity';
import { NextFunction, Request, Response } from 'express';
import { AppController } from '.';

export default class UserController extends AppController {
	async getUser(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		try {
			const user = await UserModel.findById(id, ['username', 'avatar', 'posts']);
			res.send(user);
		} catch (e) {
			next(e);
		}
	}

	async editUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { body } = res.locals;
			const user = await UserModel.findByIdAndUpdate(body._id, body, {
				new: true
			});
			res.send(user);
		} catch (e) {
			next(e);
		}
	}
}
