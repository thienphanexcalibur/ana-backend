import {Request, Response} from 'express';
import {promisify} from 'util';
import {
	_hash,
	_hashCompare,
	generateToken,
	verifyToken
} from '@utils';
import {UserModel} from '@entity';
import * as bcrypt from 'bcrypt';


class AuthController {
	async signup(req: Request, res: Response, next: any) {
		const {username, password, email, fullname, mobile} = req.body;
		const token = generateToken({
			username,
			password
		});
		const encryptedPwd = await _hash(password);
		new UserModel({username, password: encryptedPwd, email, fullname, mobile, token}).save().then((user) => {
			res.send('success');
		}).catch(e => {
			res.send('failure');
		});
	}


  auth (req: Request, res: Response, next:any) {
		const {token, username, password} = req.body;
		if (token) {
			UserModel.findOne({token}, function (err, user) {
					const userInfo = verifyToken<String>(token);
					if (userInfo) {
						res.send(userInfo);
					} else {
						res.send('failure');
					}
			});
		}

		if (username && password) {
			UserModel.findOne({username}, async function (err, user) {
				if (user) {
					const result:boolean = await _hashCompare(password, user.password);
					res.send(result ? 'success' : 'failure');
				}
			});
		}
	}
}

export default AuthController;
