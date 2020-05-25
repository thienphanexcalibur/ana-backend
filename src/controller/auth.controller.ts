// Authentication Controller
import {Request, Response, NextFunction} from 'express';
import {
	_hash,
	_hashCompare,
	generateToken
} from '@utils';
import {Model, Document} from 'mongoose';
import {IUser} from '@entity';
import AppController from '@controller/app.controller';

export class AuthController<T extends Model<Document>> extends AppController<any> {
	constructor(model: T) {
		super(model);
		this.auth = this.auth.bind(this);
		this.signup = this.signup.bind(this);
	}

	async signup(req: Request, res: Response, next: NextFunction) {
		const {username, password, email, fullname, mobile} : IUser = req.body;
		const token : string = generateToken({
			username,
			password
		});

		const encryptedPwd : string = await _hash(password);

		try {
		  const user: IUser = await this.add(
			{
				username,
				password: encryptedPwd,
				email,
				fullname,
				mobile,
				token
			} as IUser)
		  res.sendStatus(200).send(user);
		} catch (e) {
		  next(e);
		}
	}

	async auth (req: Request, res: Response, next: NextFunction) {
	  try {
		const {token, username, password} : IUser = req.body;
		let user:IUser = null;
		let result: boolean;
		if (token) {
			user = await this.find({token} as IUser);
		}

		if (username && password) {
		  user = await this.find({username} as IUser);
		  if (user) {
			result = await _hashCompare(password, user.password);
		  }
		}
		if (user && result) {
		  res.send(user);
		} else {
		  throw(this._Error({
			statusCode: 404,
			m: 'User not found'
		  }));
		}
	  } catch(e) {
		next(e);
	  }
	}
}
