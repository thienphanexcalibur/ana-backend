import { AuthMiddleware, PostMiddleware, CommentMiddleware } from '@middlewares';

function routes(app) : void {
	app.use('/auth', AuthMiddleware);
	app.use('/post', PostMiddleware);
	app.use('/comment', CommentMiddleware);
}
export default routes;
