import { NextFunction, Request, Response } from "express";
import { extractTokenFromHeader, verifyJWT } from "../utils/authUtils";
import { CustomError } from "../utils/customError";

export async function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("trying to authenticate");
    const accessToken = extractTokenFromHeader(req);
    console.log("accessToken ", accessToken);
    try {
        if (!accessToken) {
            console.error("Token not found");
            throw new CustomError("Unable to access the route.", 401);
        }
        const { payload } = verifyJWT(accessToken);

        if (!payload) {
            throw new CustomError("The accessToken has expired", 401);
        }

        req.userID = payload;

        next();
    } catch (error: any) {
        console.log("Redirecting to error handler");
        next(error);
    }
}
export async function hasRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const refreshToken = extractTokenFromHeader(req);

    try {
        if (!refreshToken) {
            console.error("Refresh token not found");
            throw new CustomError("Unable to refresh the access token", 401);
        }
        const { payload } = verifyJWT(refreshToken);
        if (!payload) {
            throw new CustomError("The session has expired", 401);
        }

        req.userID = payload;

        next();
    } catch (error: any) {
        console.log("Redirecting to error handler");
        next(error);
    }
}
