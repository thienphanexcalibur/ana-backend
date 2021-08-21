import { NextFunction, Response, Request } from 'express';
import parse from 'url-parse';
import Controller from './controller';

export default class StaticController extends Controller {
	constructor() {
		super();
		this.getStatic = this.getStatic.bind(this);
	}

	async getStatic(req: Request, res: Response, next: NextFunction): void {
		const pathname = req.path.substring(1, req.path.length);
		const paths = pathname.split('/');
		const bucket = paths[0];
		const filename = paths[1];
		if (pathname) {
			try {
				const url = await this.minio.presignedGetObject(bucket, filename);
				const parsed = parse(url);
				parsed.set('hostname', process.env.MINIO_DOMAIN);
				res.send(parsed.href);
			} catch (e) {
				next(e);
			}
		}
	}
}
