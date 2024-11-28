import { Router } from "express";
import { registerUser } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/user/register", registerUser);
//userRouter.post("/user/login", loginUser)
//userRouter.post("/user/logout", logoutUser)

export { userRouter };
