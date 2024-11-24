import { Request, Response } from "express";
import { UserService } from "../services/userServices";

// register
const registerUser = (request: Request, response: Response) => {
  const { name, email, password } = request.body;
  UserService.addUser(name, email, password);
  response.json({ id: "1", name: name, email: email });
};

// login
// logout

export { registerUser };
