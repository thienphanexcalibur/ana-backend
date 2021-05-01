import { Model, Document, DocumentQuery, Types } from "mongoose";
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

  public add(payload: any): Promise<Document> {
    const document: Promise<Document> = this.model.create(payload);
    return document;
  }

  public modify(_id: string, payload: Partial<I>): Promise<Document> {
    return this.model.findByIdAndUpdate(_id, payload).exec();
  }

  public remove(_id: string): Promise<Document> {
    return this.model.findByIdAndRemove(_id).exec();
  }

  // eslint-disable-next-line max-len
  public find(
    pre?: Types.ObjectId | Partial<I>,
    ...args: any
  ): DocumentQuery<Document[] | Document, Document> {
    if (Types.ObjectId.isValid(pre as Types.ObjectId)) {
      return this.model.findById(pre, ...args);
    }
    return this.model.find(pre, ...args);
  }

  // eslint-disable-next-line class-methods-use-this
  public _Error<T>(error: T): T {
    return error;
  }
}
