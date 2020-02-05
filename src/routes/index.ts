import {Router} from 'express';
import authController from 'controller/auth.controller';
const router:any = Router();
router.post('/auth', authController);

export default router;

