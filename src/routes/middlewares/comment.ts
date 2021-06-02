import { Router } from 'express';
import { CommentController, AuthController } from '@controller';

const router: Router = Router();
const commentController = new CommentController();

const authController = new AuthController();

router.post('/add', authController.verifyAuth, commentController.addComment);

router.get('/post/:id', commentController.getComments);

export default router;
