import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import routes from '@routes';
import { logger } from '@utils';

const {
	SERVER_PORT, DB_HOST, DB_PORT, DB_ROOT,
} = process.env;

const app : any = express();
const dbURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_ROOT}`;
// eslint-disable-next-line max-len
mongoose.connect(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).catch((e) => console.log(e));
const db = mongoose.connection;
app.use(cors({
	origin: ['http://localhost:6900'],
	credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Main
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(err.statusCode || 500).send(err || err.m);
	logger.log('error', err);
	next();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const { auth } = req.cookies;
});

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(`${new Date().toLocaleTimeString()}: ${req.method} ${req.url}`);
	next();
});

routes(app);

// start express server
app.listen(SERVER_PORT, () => {
	db.once('open', () => {
		console.log('MongoDB is connected');
	});
	db.on('error', (e) => {
		console.log('Server got trouble connecting', e);
	});
	console.log('Server is up at ', SERVER_PORT);
});
