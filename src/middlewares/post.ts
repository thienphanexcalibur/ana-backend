// Middlewares
import { Router } from 'express';
import { PostController } from '@controller';
import { PostModel } from '@entity';

const router:any = Router();

const postController = new PostController(PostModel);
router.get('/', postController.getAllPost);
router.route('/:id')
	.get(postController.getPost)
	.delete(postController.deletePost);
router.post('/add', postController.addPost);
router.post('/modify/:id', postController.editPost);
export { router };
