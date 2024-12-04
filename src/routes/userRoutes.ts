import { Router } from "express";
import {
    registerUser,
    loginUser,
    currentUser,
} from "../controllers/userController";
import { deserializeUser } from "../middlewares/deserializeUser";

const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", loginUser);
//userRouter.post("/user/logout", logoutUser)

//Protected routes
userRouter.use(deserializeUser);

userRouter.get("/user/me", currentUser);

export { userRouter };
