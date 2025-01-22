import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
//Create JWT
export const createToken = async (
    payload: any,
    expireTime: string | undefined
) => {
    return await jwt.sign({ payload }, process.env.JWT_SECRET!, {
        expiresIn: expireTime ?? "1d",
    });
};

//Verify JWT
export function verifyJWT(token: string) {
    try {
        const { payload } = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        return { payload: payload, expired: false };
    } catch (error: any) {
        return {
            payload: null,
            expired: error.message?.includes("jwt expired"),
        };
    }
}

export function extractTokenFromHeader(req: Request) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return null;
    }
    return token;
}
