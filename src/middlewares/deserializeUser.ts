import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/authUtils";
import { JwtPayload } from "jsonwebtoken";
import { findById } from "../db/userRepository";
import { CustomError } from "../utils/customError";

export async function deserializeUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { accessToken } = req.cookies;

    //TODO: use refresh token to get new access token

    try {
        if (!accessToken) {
            throw new CustomError("Unable to access the route.", 401);
        }
        const { payload } = verifyJWT(accessToken);
        if (!payload) {
            throw new CustomError("The session has expired", 401);
        }
        const user = await findById(payload);

        //console.log(`User ${JSON.stringify(user)} session restored`);

        if (user) {
            req.user = user;
        }

        next();
    } catch (error: any) {
        next;
    }
}
