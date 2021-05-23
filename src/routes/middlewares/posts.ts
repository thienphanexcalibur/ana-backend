// Middlewares
import { Router } from 'express';
import { PostController } from '@controller';
import { PostModel } from '@entity';

const router: Router = Router();

const postController = new PostController(PostModel);

router.get('/', postController.getAllPost);

export default router;
