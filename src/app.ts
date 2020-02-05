import('module-alias/register');
import * as express from "express";
import {Request, Response} from "express";
import * as bodyParser from  "body-parser";
import * as mongoose from 'mongoose';
import routes from '@routes';
const path = require('path');

const app = express();
const port:number = 3000;
const dbUri = 'mongodb://localhost:27017/reddit-clone'
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
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

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
