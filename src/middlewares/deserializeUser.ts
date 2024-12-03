import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/authUtils";
import { JwtPayload } from "jsonwebtoken";
import { findById } from "../db/userRepository";

export async function deserializeUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return next();
    }
    //TODO: use refresh token to get new access token
    //TODO: create sessioon property in req object instead of user
    try {
        const { payload } = verifyJWT(accessToken);
        if (!payload) {
            return next();
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
