// Middlewares
import { Router } from 'express';
import { AuthController } from '@controller';
import { UserModel } from '@entity';

const router: Router = Router();
const authController: AuthController = new AuthController(UserModel);

router.post('/auth/signup', authController.signup);
router.post('/auth/logout', authController.logout);
router.post('/auth', authController.auth);

export default router;
