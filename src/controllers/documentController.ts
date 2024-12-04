import { NextFunction, Request, Response } from "express";
import { DocumentService } from "../services/documentServices";

// CREATE DOCUMENT
const createDocument = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { title } = request.body;
  try {
    // TODO: get user of session
    const document = await DocumentService.addDocument(title);
    response.json();
  } catch (error: any) {
    next(error);
  }
};

export { createDocument };
