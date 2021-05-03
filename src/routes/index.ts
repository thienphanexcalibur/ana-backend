import { Express, Errback } from "express";
import {
  AuthMiddleware,
  PostMiddleware,
  CommentMiddleware,
} from "./middlewares";
import { logger } from "@utils";

function routes(app: Express): void {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      res.status(err.statusCode || 500).send(err || err.m);
      logger.log("error", err);
    }
    console.log(`${new Date().toLocaleTimeString()}: ${req.method} ${req.url}`);
    next();
  });
  app.use("/auth", AuthMiddleware);
  app.use("/post", PostMiddleware);
  app.use("/comment", CommentMiddleware);
}
export default routes;
