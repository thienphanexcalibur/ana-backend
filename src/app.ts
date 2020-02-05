import('module-alias/register');
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import * as mongoose from 'mongoose';
import routes from 'routes';
const path = require('path');

const app = express();
const port:number = 3000;
mongoose.connect('mongodb://localhost:27017/reddit-clone', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
app.use(bodyParser.json());
app.use(routes);
app.use(function(req, res, next) {
		console.log(`${Date.now()}: ${req.method} ${req.url}`);
});
// start express server
app.listen(port, () => {
		db.once('open', () => {
			console.log('MongoDB is connected');
		});
		db.on('error', (e) => {
			console.log('Server got trouble connecting', e);
		});
		console.log('Server is up at ', port);
});
