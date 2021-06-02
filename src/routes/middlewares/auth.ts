// Middlewares
import { Router } from 'express';
import { AuthController, UserController } from '@controller';

const router: Router = Router();
const authController: AuthController = new AuthController();
const userController = new UserController();

router.post('/auth/signup', authController.signup);
router.post('/auth/logout', authController.logout);
router.post('/auth', authController.auth);

router.get('/:id', userController.getUser);

router.put('/:id', authController.verifyAuth, userController.editUser);

export default router;
