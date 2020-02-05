import {Router, Request, Response} from 'express';

const router:any = Router();


router.post('/auth', function(req: Request, res: Response, next: any) {
		res.send(req.body.username + req.body.password);
});


export default router;

