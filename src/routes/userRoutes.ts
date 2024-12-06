import { Router } from "express";
import {
    registerUser,
    loginUser,
    currentUser,
} from "../controllers/userController";
import { deserializeUser } from "../middlewares/deserializeUser";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
//userRouter.post("/user/logout", logoutUser)

//Protected routes
userRouter.use(deserializeUser);

userRouter.get("/me", currentUser);

export { userRouter };
