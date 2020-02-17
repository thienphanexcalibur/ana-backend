import {Router} from 'express';
import {AuthMiddleware, PostMiddleware, CommentMiddleware} from '@middlewares';
function routes(app) {
	app.use('/auth', AuthMiddleware);
	app.use('/post', PostMiddleware);
	app.use('/comment', CommentMiddleware);
}

export default routes;
