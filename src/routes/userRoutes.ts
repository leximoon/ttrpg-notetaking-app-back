import { Router } from "express";
import {
    registerUser,
    loginUser,
    updateUser,
    currentUser,
    refreshToken,
} from "../controllers/userController";
import { isAuthenticated, hasRefreshToken } from "../middlewares/authHandler";

const userRouter = Router();
//TODO: change user route to auth and and add new user endpoint

userRouter.post("/register", registerUser, loginUser);
userRouter.post("/login", loginUser);

//REFRESH TOKEN
userRouter.post("/refresh", hasRefreshToken, refreshToken);

//Protected routes
userRouter.use(isAuthenticated);

userRouter.get("/me", currentUser);
userRouter.put("/:userId", updateUser);

export { userRouter };
