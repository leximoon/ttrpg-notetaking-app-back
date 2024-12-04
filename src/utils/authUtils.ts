import jwt, { JwtPayload } from "jsonwebtoken";
//Create JWT
export const createToken = async (payload: any, expireTime: string) => {
    return await jwt.sign({ payload }, process.env.JWT_SECRET!, {
        expiresIn: expireTime,
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
