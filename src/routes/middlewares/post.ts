// Middlewares
import { Router } from 'express';
import { AuthController, PostController } from '@controller';
import { PostModel, UserModel } from '@entity';

const router: Router = Router();

const postController = new PostController(PostModel);

const authController = new AuthController(UserModel);

// router.use(authController.verifyAuth);

router
	.route('/:id')
	.get(postController.getPost)
	.delete(postController.addPost, postController.deletePost);

router.post('/add', authController.verifyAuth, postController.addPost);

router.post('/modify/:id', authController.verifyAuth, postController.editPost);

export default router;
