// Authentication Controller
import { IUser, UserModel } from '@entity';
import { generateToken, verifyToken, _hash, _hashCompare } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';

export default class AuthController {
	constructor() {
		this.auth = this.auth.bind(this);
		this.signup = this.signup.bind(this);
		this.verifyAuth = this.verifyAuth.bind(this);
	}

	async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { username, password }: IUser = req.body;
		try {
			const encryptedPwd = await _hash(password);
			const user = await UserModel.create({
				username,
				password: encryptedPwd
			});
			const token = generateToken({ id: user._id });
			user.token = token;
			await user.save();
			res.cookie('auth', token, { maxAge: 2147483647, httpOnly: true }).status(200).send(user);
			next();
		} catch (e) {
			next(e);
		}
	}

	logout(req: Request, res: Response) {
		res.status(200).cookie('auth', '').send('Log out successfully');
	}

	verifyAuth(req: Request, res: Response, next: NextFunction) {
		const { auth } = req.cookies;
		let result = false;
		try {
			if (auth) {
				const userId: ObjectId = verifyToken(auth).id;
				if (userId) {
					result = true;
				}
			}
			if (result) {
				res.locals.body = req.body;
				next();
			} else {
				res.status(401).send({
					message: 'Unauthorized'
				});
			}
		} catch (e) {
			next(e);
		}
	}

	async auth(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { username, password }: IUser = req.body;
			const { auth } = req.cookies;
			let user: IUser;
			let result: boolean;

			if (auth) {
				const userId: ObjectId = verifyToken(auth).id;
				if (userId) {
					user = await UserModel.findById(userId);
					if (user) {
						result = true;
					}
				}
			}

			if (username && password) {
				user = await UserModel.findOne({ username });
				if (user) {
					result = await _hashCompare(password, user.password);
				}
			}

			if (user && result) {
				res
					.cookie('auth', user.token, { maxAge: 2147483647, httpOnly: true })
					.status(200)
					.send(user);
			} else {
				res.status(200).send(user);
			}
			next();
		} catch (e) {
			next(e);
		}
	}
}
