import {Request, Response} from 'express';
import {promisify} from 'util';
import {_hash} from '@utils';
export default async function (req: Request, res: Response, next: any) {
	const {username, password} = req.body;
	const hashedPassword: string = await _hash(password);
	console.log(hashedPassword);
}
