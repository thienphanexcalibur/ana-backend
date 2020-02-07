import {Router} from 'express';
import AuthController from '@controller/auth.controller';
const router:any = Router();
const authController = new AuthController();

router.post('/auth', authController.auth);
router.post('/auth/signup', authController.signup);

export default router;

