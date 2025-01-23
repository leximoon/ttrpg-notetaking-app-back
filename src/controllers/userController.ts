import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userServices";
import { createToken } from "../utils/authUtils";
import { CustomError } from "../utils/customError";

const currentUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const userID = await UserService.findCurrentUser(request.userID);
        response.json(userID);
    } catch (error: any) {
        next(error);
    }
};

// register
const registerUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { name, email, password } = request.body;
    console.log("Registering user ", name);
    try {
        const user = await UserService.addUser(name, email, password);
        response.send(user);
    } catch (error: any) {
        next(error);
    }
};

// login

const loginUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { username, password } = request.body;
    console.log("this is the body", request.body);

    try {
        console.log("Trying to log in user: ", username);
        const user = await UserService.loginUser(username, password);

        //Token Generation for accessing protected routes
        console.log("User loged in: ", user);
        response.send(user);
    } catch (error: any) {
        next(error);
    }
};
// updateUser

const updateUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const userID = request.userID;
    const { name, email } = request.body;
    console.log("Updating user: ", userID);
    try {
        if (userID != request.params.userId) {
            throw new CustomError(
                "Unable to update user information. Token user id don`t match",
                403
            );
        }

        const newUser = await UserService.updateUser(userID, name, email);
        console.log("This is the new user:", newUser);
        response.send(newUser);
    } catch (error: any) {
        next(error);
    }
};

// refresh token

const refreshToken = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const userId = request.userID;

    const newTokens = await UserService.updateTokens(userId);

    response.send(newTokens);
};
export { registerUser, loginUser, currentUser, updateUser, refreshToken };
