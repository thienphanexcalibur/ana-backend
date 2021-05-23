import { Router } from 'express';
import { CommentController, AuthController } from '@controller';
import { CommentModel, UserModel } from '@entity';

const router: Router = Router();
const commentController = new CommentController(CommentModel);

const authController = new AuthController(UserModel);

router.post('/add', authController.verifyAuth, commentController.addComment);

router.get('/post/:id', commentController.getComments);

export default router;
