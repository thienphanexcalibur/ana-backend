import {Router} from 'express';
import {CommentController} from '@controller';
import {CommentModel} from '@entity';

const router:any = Router();
const commentController = new CommentController(CommentModel);

router.route('/').post(commentController.addComment);

export {router};
