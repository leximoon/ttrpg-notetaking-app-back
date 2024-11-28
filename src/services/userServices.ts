import { z, ZodError, ZodSchema } from "zod";
import bcrypt from "bcryptjs";
import { create, findByEmail } from "../db/userRepository";

const addUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

// register
export class UserService {
  static async addUser(name: string, email: string, password: string) {
    try {
      addUserSchema.parse({ name, email, password });
      //TODO: check in db if email already exists
      if (await findByEmail(email)) {
        throw new Error("Email is already registered.");
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // save user in db
      const user = create(email, hashedPassword, name);
      return user;
    } catch (error: any) {
      if (error instanceof ZodError) {
        error.errors.map(({ message }) => {
          console.log(message);
        });
      } else {
        console.log(error.message);
      }
    }
  }
}
