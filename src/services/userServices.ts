import { z, ZodError, ZodSchema } from "zod";
import bcrypt from "bcryptjs";

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
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hash(password, salt);
      //TODO: save user in db
    } catch (error: any) {
      if (error instanceof ZodError) {
        error.errors.map(({ message }) => {
          console.log(message);
        });
      }
    }
  }
}
