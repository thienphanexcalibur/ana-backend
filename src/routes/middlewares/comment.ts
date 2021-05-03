import { Router } from "express";
import { CommentController } from "@controller";
import { CommentModel } from "@entity";

const router: Router = Router();
const commentController = new CommentController(CommentModel);

router.post("/add", commentController.addComment);

export { router };
