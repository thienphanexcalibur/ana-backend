// Middlewares
import { Router } from 'express';
import { AuthController } from '@controller';
import { UserModel } from '@entity';

const router: Router = Router();
const authController: AuthController = new AuthController(UserModel);

router.post('/signup', authController.signup);
router.post('/logout', authController.logout);
router.post('/', authController.auth);

export default router;
