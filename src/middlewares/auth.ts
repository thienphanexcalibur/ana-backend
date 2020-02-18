// Middlewares
import {Router} from 'express';
import {AuthController} from '@controller';
import {UserModel} from '@entity';

const router:any = Router();
const authController = new AuthController(UserModel);

router.post('/signup', authController.signup);
router.post('/', authController.auth);

export {router};
