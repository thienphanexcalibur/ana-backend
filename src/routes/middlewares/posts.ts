// Middlewares
import { Router } from 'express';
import { PostController } from '@controller';

const router: Router = Router();

const postController = new PostController();

router.get('/', postController.getAllPost);

export default router;
