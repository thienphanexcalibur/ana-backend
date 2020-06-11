import { Model, Document, Types, Query } from 'mongoose';


export default class AppController<T extends Model<Document>> {
	public model: T;
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

	public find<T>(pre?: T) : Query<any> {
		if (Types.ObjectId.isValid(pre as any)) {
			return this.model.findById(pre);
		}
			return this.model.find(pre);
	}
	public _Error<T>(error: T) : T {
		return error;
	}
}
