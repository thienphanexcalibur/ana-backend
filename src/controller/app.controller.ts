import {Request, Response} from 'express';
import {Model, Document, Query, Types, Promise} from 'mongoose';
import {logger} from '@utils';

export default class AppController<T extends Model<Document>> {
			model: T;
			constructor(model: T) {
				this.model = model;
				this.find = this.find.bind(this);
				this.add = this.add.bind(this);
				this.modify = this.modify.bind(this);
			}

			add<T>(payload: T) : Promise<any> {
				return new this.model(payload).save();
			}

			modify<T>(_id: string, payload: T) : Promise<any> {
				return this.model.findByIdAndUpdate(_id, payload).exec();
			}

			remove(_id: string) : Promise<any> {
				return this.model.findByIdAndRemove(_id).exec();
			}

			find<T>(pre: T) : Promise<any> {
				if (typeof pre === 'string') {
					return this.model.findById(pre).exec();
				}
					return this.model.findOne(pre).exec();
			}
}


