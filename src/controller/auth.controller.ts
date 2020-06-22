// Authentication Controller
import {Request, Response, NextFunction} from 'express';
import {
	_hash,
	_hashCompare,
	generateToken,
	verifyToken
} from '@utils';
import {Model, Document, Types} from 'mongoose';
import {IUser} from '@entity';
import AppController from '@controller/app.controller';

export class AuthController<T extends Model<Document>> extends AppController<any> {
	constructor(model: T) {
		super(model);
		this.auth = this.auth.bind(this);
		this.signup = this.signup.bind(this);
	}

	async signup (req: Request, res: Response, next: NextFunction) {
		const {
			username,
			password,
			email,
			fullname,
			mobile
		} : IUser = req.body;

		const encryptedPwd : string = await _hash(password);

		try {
		  const user: IUser = await this.add(
			{
				username,
				password: encryptedPwd,
				email,
				fullname,
				mobile
			} as IUser)
			const token = generateToken({id: user._id}) as string;
			user.token = token;
			await user.save();
		  res.cookie('auth', token, {maxAge: 2147483647, httpOnly: true}).send(user);
		  next();
		} catch (e) {
			res.sendStatus(500);
		  next(e);
		}
	}

	async auth (req: Request, res: Response, next: NextFunction) {
	  try {
		const {username, password} : IUser = req.body;
		const {auth} = req.cookies;
		let userId: Types.ObjectId;
		let user:IUser = null;
		let result: boolean;

		if (auth) {
			userId = (verifyToken(auth)).id;
			user = await this.find(userId, 'username fullname email mobile');
			if (user) {
				result = true;
			}
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
