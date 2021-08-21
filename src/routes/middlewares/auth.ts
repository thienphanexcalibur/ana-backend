// Middlewares
import { Router } from 'express';
import { AuthController, UserController } from '@controller';
const multer = require('multer');

const router: Router = Router();
const authController: AuthController = new AuthController();
const userController = new UserController();

const upload = multer();

router.post('/auth/signup', authController.signup);
router.post('/auth/logout', authController.logout);
router.post('/auth', authController.auth);

router.post('/', userController.getUser);

router.put('/', upload.single('avatar'), authController.verifyAuth, userController.editUser);

export default router;
