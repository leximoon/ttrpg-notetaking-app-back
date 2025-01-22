import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userServices";
import { createToken } from "../utils/authUtils";

//TODO: link accessToken expire time from env to this value in ms.
//15m of access token expire time
const TOKEN_EXPIRE_TIME = 15 * 60 * 1000;

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
        response.json(user?.email);
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
        const accessToken = await createToken(
            user.id,
            process.env.ACCESS_TOKEN_EXPIRE_TIME
        );
        const refreshToken = await createToken(
            user.id,
            process.env.REFRESH_TOKEN_EXPIRE_TIME
        );

        console.log("AccessToken: ", accessToken);

        response.send({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            backendTokens: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: new Date().setTime(
                    new Date().getTime() + TOKEN_EXPIRE_TIME
                ),
            },
        });
    } catch (error: any) {
        next(error);
    }
};
// logout

// refresh token

const refreshToken = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const userId = request.userID;
    console.log("The session has not expired, refreshing access token");
    //Token Generation for accessing protected routes
    const accessToken = await createToken(
        userId,
        process.env.ACCESS_TOKEN_EXPIRE_TIME
    );
    console.log(accessToken);
    const refreshToken = await createToken(
        userId,
        process.env.REFRESH_TOKEN_EXPIRE_TIME
    );

    console.log("Token refreshed: ", accessToken);

    response.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: new Date().setTime(new Date().getTime() + TOKEN_EXPIRE_TIME),
    });
};
export { registerUser, loginUser, currentUser, refreshToken };
