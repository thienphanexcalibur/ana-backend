import { Router } from 'express';
import StaticController from '@/controller/static.controller';

const router: Router = Router();
const staticController = new StaticController();

router.get('*', staticController.getStatic);

export default router;
