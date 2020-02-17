import * as express from "express";
import * as bodyParser from  "body-parser";
import * as mongoose from 'mongoose';
import routes from '@routes';
import * as winstonMongodb from 'winston-mongodb';
const {SERVER_HOST, SERVER_PORT, DB_HOST, DB_PORT, DB_ROOT}  = process.env;
const app = express();
const dbURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_ROOT}`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

app.use(bodyParser.json());
app.use(function(req, res, next) {
		console.log(`${Date.now()}: ${req.method} ${req.url}`);
		next();
});
app.use(function(err, req, res, next) {
		console.log(err);
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

