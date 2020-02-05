import {Request, Response} from 'express';

export default function (req: Request, res: Response, next: any) {
		res.send(req.body.username + req.body.password);
}
