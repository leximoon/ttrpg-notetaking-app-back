import { Router } from "express";
import { registerUser } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/user/register", registerUser)

export { userRouter };