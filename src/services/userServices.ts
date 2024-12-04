import { z } from "zod";
import bcrypt from "bcryptjs";
import { create, findByEmail, findById } from "../db/userRepository";
import { CustomError } from "../utils/customError";

const addUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

const loginoutUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

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

        console.log(`User ${user.email} logged in`);
        return user;
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
}
