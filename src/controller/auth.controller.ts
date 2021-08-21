// Authentication Controller
import { IUser, UserModel } from '@entity';
import { generateToken, verifyToken, _hash, _hashCompare } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import Controller from './controller';

export default class AuthController extends Controller {
	constructor() {
		super();
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
		res.status(200).clearCookie('auth').send('Log out successfully');
	}

	verifyAuth(req: Request, res: Response, next: NextFunction) {
		const { auth } = req.cookies;
		let result = false;
		let decodedUserId: ObjectId;
		try {
			if (auth) {
				decodedUserId = verifyToken(auth).id;
				if (decodedUserId) {
					result = true;
				}
			}
			if (result) {
				res.locals.body = req.body;
				res.locals.authId = decodedUserId;
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
					user = await UserModel.findById(userId, '-password -posts').lean();
					if (user) {
						result = true;
					}
				} else {
					res.status(401).send({
						message: 'Unauthorized',
						data: null
					});
				}
			}

			if (username && password) {
				user = await UserModel.findOne({ username }).lean();
				if (user) {
					result = await _hashCompare(password, user.password);
				}
			}

			if (user && result) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password: omitPassword, token: omitToken, ...rest } = user;
				res.cookie('auth', user.token, { maxAge: 2147483647, httpOnly: true }).status(200).send({
					data: rest
				});
			} else {
				res.status(200).send({
					message: 'User not found',
					data: null
				});
			}
			next();
		} catch (e) {
			next(e);
		}
	}
}
