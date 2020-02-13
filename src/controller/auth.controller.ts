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
		const {username, password, email, fullname, mobile} : IUser = req.body;
		const token : string = generateToken({
			username,
			password
		});
		const encryptedPwd : string = await _hash(password);
		try {
		const user: IUser = await this.add({username,
			password: encryptedPwd,
			email,
			fullname,
			mobile,
			token
		} as IUser)
				res.send('success');
		} catch (e) {
				logger.log('error', e, );
				res.send('failure');
			return;
		}
	}

	async auth (req: Request, res: Response, next: Function) {
		const {token, username, password} : IUser = req.body;
		if (token) {
			const user:IUser =  await this.find({token} as IUser);
			const userInfo:any = verifyToken<String>(token);
					res.send(userInfo ? 'success' : 'failure');
		}

		if (username && password) {
			const user: IUser = await this.find({username, password} as IUser);
			const result:boolean = await _hashCompare(password, user.password);
					res.send(result ? 'success' : 'failure');
		}
	}
}
