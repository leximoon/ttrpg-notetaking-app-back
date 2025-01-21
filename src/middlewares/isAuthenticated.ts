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
        //TODO: use refresh token to get new access token
        if (!payload) {
            throw new CustomError("The session has expired", 401);
        }

        //console.log(`User ${JSON.stringify(user)} session restored`);

        req.userID = payload;

        next();
    } catch (error: any) {
        console.log("Redirecting to error handler");
        next(error);
    }
}
