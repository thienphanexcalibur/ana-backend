import { Router } from "express";
import { CommentController } from "@controller";
import { CommentModel } from "@entity";

const router: Router = Router();
const commentController = new CommentController(CommentModel);

router.route("/add").post(commentController.addComment);

export { router };
