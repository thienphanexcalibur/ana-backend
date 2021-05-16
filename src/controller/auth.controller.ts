// Authentication Controller
import { AppController } from '@controller';
import { IUser } from '@entity';
import { generateToken, verifyToken, _hash, _hashCompare } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { Document, Model, ObjectId } from 'mongoose';

export default class AuthController extends AppController {
	public model: Model<Document>;

	constructor(model: Model<Document>) {
		super(model);
		this.auth = this.auth.bind(this);
		this.signup = this.signup.bind(this);
	}

	async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { username, password, email, fullname, mobile }: IUser = req.body;
		try {
			const encryptedPwd = await _hash(password);
			const user = await this.model.create({
				username,
				password: encryptedPwd
			});
			const token = generateToken({ id: user._id });
			user.token = token;
			await user.save();
			res.cookie('auth', token, { maxAge: 2147483647, httpOnly: true }).status(200).send(user);
			next();
		} catch (e) {
			res.status(500).send(e);
			next(e);
		}
	}

	logout(req: Request, res: Response, next: NextFunction) {
		res.status(200).cookie('auth', '').send('Log out successfully');
		next();
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
					user = await this.model.findById(userId);
					if (user) {
						result = true;
					}
				}
			}

			if (username && password) {
				user = await this.model.findOne({ username });
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
				res.status(200).send({});
			}
		} catch (e) {
			res.sendStatus(500);
			next(e);
		}
	}
}
