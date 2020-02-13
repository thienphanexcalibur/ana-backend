import {Router} from 'express';
import {AuthController} from '@controller';
import {UserModel} from '@entity';
const router:any = Router();
const authController = new AuthController(UserModel);

router.post('/auth', authController.auth);
router.post('/auth/signup', authController.signup);

export default router;
