import { z } from "zod";
import bcrypt from "bcryptjs";
import { create, findByEmail } from "../db/userRepository";
import { CustomError } from "../utils/customError";

const addUserSchema = z.object({
  name: z.string(),
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
}
