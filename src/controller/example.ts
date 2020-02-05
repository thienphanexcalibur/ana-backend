import {Router, Request, Response} from 'express';

const router:any = Router();

router.get('/version', function (req: Request, res: Response, next:any) {
			res.send('1.0.0');
});

router.post('/auth', function (req: Request, res: Response, next: any) {

});

router.get('/post/:id', function (req: Request, res: Response, next: any) {
});


export default router;
