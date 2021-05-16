import {
  Model,
  Document,
  DocumentQuery,
  Types,
  QueryCursor,
  Query,
} from "mongoose";
import { IComment, IUser, IPost } from "@entity";

declare type I = IComment | IUser | IPost | IUser;

export default class AppController {
  public model: Model<Document>;

  constructor(model: Model<Document>) {
    this.model = model;
    this.find = this.find.bind(this);
    this.add = this.add.bind(this);
    this.modify = this.modify.bind(this);
  }

  add(payload: any) {
    const document = this.model.create(payload);
    return document;
  }

  modify(_id: string, payload: Partial<I>): Promise<Document> {
    return this.model.findByIdAndUpdate(_id, payload).exec();
  }

  remove(_id: string): Promise<Document> {
    return this.model.findByIdAndRemove(_id).exec();
  }

  // eslint-disable-next-line max-len
  find(pre?: Types.ObjectId | Partial<I>, ...args: any) {
    if (Types.ObjectId.isValid(pre as Types.ObjectId)) {
      return this.model.findById(pre, ...args);
    }
    return this.model.find(pre, ...args);
  }

  // eslint-disable-next-line class-methods-use-this
  _Error<T>(error: T): T {
    return error;
  }
}
