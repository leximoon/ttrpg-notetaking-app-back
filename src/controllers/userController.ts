import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userServices";

// register
const registerUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, email, password } = request.body;
  try {
    const user = await UserService.addUser(name, email, password);
    response.json(user?.email);
  } catch (error: any) {
    next(error);
  }
};

// login
// logout

export { registerUser };
