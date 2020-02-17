import {Request, Response} from 'express';
import {Model, Document, Query, Types, Promise} from 'mongoose';

export default class AppController<T extends Model<Document>> {
			private model: T;
			constructor(model: T) {
				this.model = model;
				this.find = this.find.bind(this);
				this.add = this.add.bind(this);
				this.modify = this.modify.bind(this);
			}

			public add<T>(payload: T) : Promise<any> {
				return new this.model(payload).save();
			}

			public modify<T>(_id: string, payload: T) : Promise<any> {
				return this.model.findByIdAndUpdate(_id, payload).exec();
			}

			public remove(_id: string) : Promise<any> {
				return this.model.findByIdAndRemove(_id).exec();
			}

			public find<T>(pre: T) : Promise<any> {
				if (Types.ObjectId.isValid(pre as any)) {
					return this.model.findById(pre).exec();
				}
					return this.model.findOne(pre).exec();
			}
}


