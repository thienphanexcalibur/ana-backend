import {
	Express,
	Errback,
	Request,
	Response,
	NextFunction,
	urlencoded,
	json,
	request
} from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from '@utils';
import { AuthMiddleware, PostMiddleware, CommentMiddleware, PostsMiddleware } from './middlewares';

function routes(app: Express): void {
	app.use(
		cors({
			origin: ['http://localhost:6900', /ngrok/],
			credentials: true
		})
	);

	app.use((req: Request, res: Response, next: NextFunction) => {
		console.log(`${new Date().toLocaleTimeString()}: ${req.method} ${req.url}`);
		next();
	});

	app.use((err: any, req: Request, res: Response, next: NextFunction) => {
		if (err) {
			res.status(err.statusCode || 500).send(err || err.m);
			logger.log('error', err);
		}
		next();
	});

	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(cookieParser());

	app.use('/user', AuthMiddleware);
	app.use('/post', PostMiddleware);
	app.use('/posts', PostsMiddleware);
	app.use('/comment', CommentMiddleware);
}
export default routes;
