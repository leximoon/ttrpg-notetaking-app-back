import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/authUtils";
import { JwtPayload } from "jsonwebtoken";
import { findById } from "../db/userRepository";
import { CustomError } from "../utils/customError";

export async function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { accessToken } = req.cookies;

    try {
        if (!accessToken) {
            throw new CustomError("Unable to access the route.", 401);
        }
        const { payload } = verifyJWT(accessToken);
        //TODO: use refresh token to get new access token
        if (!payload) {
            throw new CustomError("The session has expired", 401);
        }

        //console.log(`User ${JSON.stringify(user)} session restored`);

        req.userID = payload;

        next();
    } catch (error: any) {
        next;
    }
}
