/* eslint-disable no-useless-constructor */
import { Model, Document, Types } from 'mongoose';
import AppController from '@controller/app.controller';
import { IUser } from '@entity';

export class UserController extends AppController {
	public model: Model<Document>

	constructor(model: Model<Document>) {
		super(model);
	}

	async getUser({ _id } : {_id: Types.ObjectId}) : Promise<IUser> {
		const user = (await this.find(_id)) as IUser;
		return user;
	}
}
