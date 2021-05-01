// Middlewares
import { Router, IRouter } from "express";
import { AuthController } from "@controller";
import { UserModel } from "@entity";

const router: IRouter = Router();
const authController = new AuthController(UserModel);

router.post("/signup", authController.signup);
router.post("/", authController.auth);

export { router };
