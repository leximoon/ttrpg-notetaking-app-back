import { Request, Response } from "express";
import { UserService } from "../services/userServices";

// register
const registerUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;
  const user = await UserService.addUser(name, email, password);
  response.json(user?.email);
};

// login
// logout

export { registerUser };
