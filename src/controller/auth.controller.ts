// Authentication Controller
import {Request, Response} from 'express';
import {
	_hash,
	_hashCompare,
	generateToken,
	verifyToken
} from '@utils';
import {Model, Document} from 'mongoose';
import {UserModel, IUser} from '@entity';
import AppController from '@controller/app.controller';
import {logger} from '@utils';

export class AuthController<T extends Model<Document>> extends AppController<any> {
	constructor(model) {
		super(model);
		this.auth = this.auth.bind(this);
		this.signup = this.signup.bind(this);
	}

	async signup(req: Request, res: Response, next: Function) {
		try {
		const {username, password, email, fullname, mobile} : IUser = req.body;
		const token : string = generateToken({
			username,
			password
		});
		const encryptedPwd : string = await _hash(password);
		const user: IUser = await this.add({username,
			password: encryptedPwd,
			email,
			fullname,
			mobile,
			token
		} as IUser)
				res.send('success');
		} catch (e) {
				res.send('failure');
				logger.log('error', e);
		}
	}

	async auth (req: Request, res: Response, next: Function) {
		try {
			const {token, username, password} : IUser = req.body;
			let user:IUser = null;
			if (token) {
				user = await this.find({token} as IUser);
				const userInfo:any = verifyToken<String>(token);
				if (!user || !userInfo) {
					res.sendStatus(404);
					return;
				}
			}

			if (username && password) {
				user = await this.find({username} as IUser);
				const result:boolean = await _hashCompare(password, user.password);
				if (!user || !result) {
					res.sendStatus(404);
					return;
				}
			}

			res.send(user);
		} catch(e) {
			logger.log('error', e);
		}
	}
}
