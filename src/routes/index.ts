import { Express, Errback, Request, Response, NextFunction, urlencoded, json } from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from '@utils';
import { AuthMiddleware, PostMiddleware, CommentMiddleware } from './middlewares';

function routes(app: Express): void {
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

	app.use(
		cors({
			origin: ['http://localhost:6900'],
			credentials: true
		})
	);
	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(cookieParser());

	app.use('/auth', AuthMiddleware);
	app.use('/post', PostMiddleware);
	app.use('/comment', CommentMiddleware);
}
export default routes;
