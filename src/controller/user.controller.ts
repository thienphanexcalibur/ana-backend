import { UserModel } from '@/entity';
import { NextFunction, Request, Response } from 'express';
import Controller from './controller';

export default class UserController extends Controller {
	constructor() {
		super();
		this.editUser = this.editUser.bind(this);
	}

	async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.body;
		try {
			const user = await UserModel.findById(id, ['username', 'avatar', 'bio']);
			res.send(user);
		} catch (e) {
			next(e);
		}
	}

	async editUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { authId, body } = res.locals;

		// extract
		const { avatar = '', ...rest } = body;

		// file from multer
		const { file } = req;

		let avatarURL: string = avatar;

		if (file) {
			const url = await this.putStatic('avatar', file.originalname, file.buffer);
			avatarURL = url;
		}
		try {
			await UserModel.findByIdAndUpdate(
				authId,
				{ ...rest, avatar: avatarURL },
				{
					new: true,
					strict: false
				}
			);
			res.send('Success');
		} catch (e) {
			next(e);
		}
	}
}
