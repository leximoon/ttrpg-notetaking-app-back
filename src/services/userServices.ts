import { z } from "zod";
import bcrypt from "bcryptjs";
import {
    create,
    findByEmail,
    findById,
    updateUserInformation,
} from "../db/userRepository";
import { CustomError } from "../utils/customError";
import { createToken } from "../utils/authUtils";

const addUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

const loginoutUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

//TODO: link accessToken expire time from env to this value in ms.
//15m of access token expire time
const TOKEN_EXPIRE_TIME = 15 * 60 * 1000;

// register
export class UserService {
    static async addUser(name: string, email: string, password: string) {
        addUserSchema.parse({ name, email, password });
        //check in db if email already exists
        if (await findByEmail(email)) {
            throw new CustomError("Email is already registered.", 409);
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save user in db
        const user = create(email, hashedPassword, name);
        return user;
    }

    static async loginUser(email: string, password: string) {
        loginoutUserSchema.parse({ email, password });
        const user = await findByEmail(email);
        if (!user) {
            throw new CustomError("Email is not registered.", 404);
        }
        if (!(await bcrypt.compare(password, user.password))) {
            throw new CustomError("Wrong email or password.", 401);
        }
        const tokens = await UserService.updateTokens(user.id);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            backendTokens: tokens,
        };
    }

    static async findCurrentUser(userID: string) {
        if (!userID) {
            throw new CustomError("User not authorized", 403);
        }

        const user = await findById(userID);

        if (!user) {
            throw new CustomError("User not found", 404);
        }
        return user.id;
    }

    static async updateUser(userID: string, name: string, email: string) {
        if (userID && !name && !email) {
            throw new CustomError(
                "No arguments sent. Unable to update user",
                400
            );
        }

        const updatedUser = await updateUserInformation(userID, name, email);
        console.log("Updated user", updatedUser);
        if (updatedUser === null) {
            throw new CustomError("An error has occurred in the database", 500);
        }
        return updatedUser;
    }

    static async updateTokens(userId: string) {
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

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: new Date().setTime(
                new Date().getTime() + TOKEN_EXPIRE_TIME
            ),
        };
    }
}
