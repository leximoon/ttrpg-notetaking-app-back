import { NextFunction, Request, Response } from "express";
import { DocumentService } from "../services/documentServices";
import { CustomError } from "../utils/customError";

// CREATE DOCUMENT
const createDocument = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { title } = request.body;
  console.log("Creating document...");
  try {
    //TODO: When login fixed change userid to request.user.id
    const document = await DocumentService.addDocument(
      title,
      "13bbf4e6-aab8-4186-acb0-e909d0bc67bb"
    );
    response.json(document);
  } catch (error: any) {
    next(error);
  }
};

// LOAD USER DOCUMENTS
const loadUserDocuments = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("Loading documents...");
  try {
    /*const user = request.user
    if (!user) {
      throw new CustomError("", 403);
    }*/
    const documents = await DocumentService.loadUserDocuments(
      "13bbf4e6-aab8-4186-acb0-e909d0bc67bb"
    );
    response.json(documents);
  } catch (error: any) {
    next(error);
  }
};

export { createDocument, loadUserDocuments };
