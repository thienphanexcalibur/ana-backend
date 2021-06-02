import express, { Express } from 'express';
import mongoose, { Connection } from 'mongoose';
import routes from '@routes';

const { SERVER_PORT, DB_HOST, DB_PORT, DB_ROOT } = process.env;

const app: Express = express();

const dbURI = `mongodb://root:root@${DB_HOST}:${DB_PORT}/${DB_ROOT}`;

// eslint-disable-next-line max-len
mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		authSource: 'admin',
		user: 'admin',
		pass: 'admin'
	})
	.catch((e) => console.log(e));
const db: Connection = mongoose.connection;

routes(app);
// start express server
app.listen(SERVER_PORT, () => {
	db.once('open', async () => {
		console.log('MongoDB is connected');
	});
	db.on('error', (e) => {
		console.log('Server got trouble connecting', e);
	});
	console.log('Server is up at ', SERVER_PORT);
});
