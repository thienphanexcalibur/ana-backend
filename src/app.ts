import * as express from "express";
import {Request, Response, NextFunction} from 'express'
import * as bodyParser from  "body-parser";
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import routes from '@routes';
import {logger} from '@utils';
const {SERVER_PORT, DB_HOST, DB_PORT, DB_ROOT}  = process.env;

const app = express();
const dbURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_ROOT}`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

app.use(bodyParser.json());
app.use(cors());
// Main
routes(app);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(err.statusCode || 500).send(err || err.m);
	logger.log('error', err);
	next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(`${new Date().toLocaleTimeString()}: ${req.method} ${req.url}`);
	next();
});

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
