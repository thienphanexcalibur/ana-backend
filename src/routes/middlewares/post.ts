// Middlewares
import { Router } from 'express';
import { AuthController, PostController } from '@controller';
const multer = require('multer');

const router: Router = Router();

const postController = new PostController();

const authController = new AuthController();

const upload = multer();

// router.use(authController.verifyAuth);

router
	.route('/:id')
	.get(postController.getPost)
	.delete(postController.addPost, postController.deletePost);

router.post('/add', upload.single('thumbnail'), authController.verifyAuth, postController.addPost);

router.put(
	'/modify/:id',
	upload.single('thumbnail'),
	authController.verifyAuth,
	postController.editPost
);

router.put('/interact', authController.verifyAuth, postController.interact);

export default router;
