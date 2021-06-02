// Middlewares
import { Router } from 'express';
import { AuthController, PostController } from '@controller';

const router: Router = Router();

const postController = new PostController();

const authController = new AuthController();

// router.use(authController.verifyAuth);

router
	.route('/:id')
	.get(postController.getPost)
	.delete(postController.addPost, postController.deletePost);

router.post('/add', authController.verifyAuth, postController.addPost);

router.post('/modify/:id', authController.verifyAuth, postController.editPost);

router.put('/interact', authController.verifyAuth, postController.interact);

export default router;
