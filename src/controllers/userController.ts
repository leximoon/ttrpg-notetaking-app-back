import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userServices";
import { createToken } from "../utils/authUtils";

// register
const registerUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { name, email, password } = request.body;
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
    const { email, password } = request.body;

    try {
        const user = await UserService.loginUser(email, password);

        //TODO: define token times in .evn or config

        //Token Generation for accessing protected routes
        const accessToken = await createToken(user.id, "1y");
        const refreshToken = await createToken(user.id, "1y");

        //TODO: maxAge .eenv or config
        //Adding tokens to cookies
        response.cookie("accessToken", accessToken, {
            httpOnly: true, // Cookie only accessible by the server
            sameSite: "lax", // Cookie only sent to same origin
            maxAge: 10000 * 60 * 60 * 24 * 30 * 12, // 1year
            secure: false, // Set to true if you're using https
        });

        response.cookie("refreshToken", refreshToken, {
            httpOnly: true, // Cookie only accessible by the server
            sameSite: "lax", // Cookie only sent to same origin
            maxAge: 10000 * 60 * 60 * 24 * 30 * 12, // 1year
            secure: false, // Set to true if you're using https
        });

        response.send({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error: any) {
        next(error);
    }
};
// logout

export { registerUser, loginUser };
