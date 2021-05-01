// Authentication Controller
import { Request, Response, NextFunction } from "express";
import { _hash, _hashCompare, generateToken, verifyToken } from "@utils";
import { Model, Document, Types } from "mongoose";
import { IUser } from "@entity";
import AppController from "@controller/app.controller";

export class AuthController extends AppController {
  public model: Model<Document>;

  constructor(model: Model<Document>) {
    super(model);
    this.auth = this.auth.bind(this);
    this.signup = this.signup.bind(this);
  }

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password, email, fullname, mobile }: IUser = req.body;

    const encryptedPwd: string = await _hash(password);

    try {
      const user = (await this.add({
        username,
        password: encryptedPwd,
        email,
        fullname,
        mobile,
      } as IUser)) as IUser;
      const token = generateToken({ id: user._id });
      user.token = token;
      await user.save();
      res
        .cookie("auth", token, { maxAge: 2147483647, httpOnly: true })
        .send(user);
      next();
    } catch (e) {
      res.sendStatus(500);
      next(e);
    }
  }

  async auth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password }: IUser = req.body;
      const { auth } = req.cookies;
      let userId: Types.ObjectId;
      let user: IUser;
      let result: boolean;

      if (auth) {
        userId = verifyToken(auth).id;
        user = (await this.find(
          userId,
          "username fullname email mobile"
        )) as IUser;
        if (user) {
          result = true;
        }
      }

      if (username && password) {
        user = (await this.find({ username } as IUser)) as IUser;
        if (user) {
          result = await _hashCompare(password, user.password);
        }
      }

      if (user && result) {
        res.send(user);
      } else {
        res.send({});
      }
    } catch (e) {
      res.sendStatus(500);
      next(e);
    }
  }
}
