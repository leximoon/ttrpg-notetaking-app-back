import { Router } from "express";
import {
    registerUser,
    loginUser,
    currentUser,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
//userRouter.post("/user/logout", logoutUser)

//Protected routes
userRouter.use(isAuthenticated);

userRouter.get("/me", currentUser);

export { userRouter };
