import { NextFunction, Request, Response } from "express";
import { DocumentService } from "../services/documentServices";
import { CustomError } from "../utils/customError";

type QueryParams = {
  parentDocumentId?: string;
};
// CREATE DOCUMENT
const createDocument = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { title, worldId, parentDocumentId } = request.body;
  const userId = request.userID;

  console.log("Creating document...");
  try {
    const document = await DocumentService.addDocument(
      title,
      userId,
      worldId,
      parentDocumentId
    );
    response.json(document);
  } catch (error: any) {
    next(error);
  }
};

// EDIT DOCUMENT
const updateDocument = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { documentId, field, content } = request.body;
  const userId = request.userID;

  console.log("Editing document...");
  try {
    const document = await DocumentService.updateDocument(
      documentId,
      field,
      content
    );
    response.json(document);
  } catch (error: any) {
    next(error);
  }
};

// DELETE DOCUMENT
const deleteDocument = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { documentId } = request.body;
  const userId = request.userID;

  console.log("Editing document...");
  try {
    const document = await DocumentService.deleteDocument(documentId);
    response.json(document);
  } catch (error: any) {
    next(error);
  }
};

// LOAD WORLD DOCUMENTS
const loadWorldDocuments = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { parentDocumentId } = request.query as QueryParams;
  console.log("Loading documents...");
  try {
    const worldId = request.params.worldId;
    if (!worldId) {
      throw new CustomError("", 403);
    }
    const documents = await DocumentService.loadWorldDocuments(
      worldId,
      parentDocumentId
    );
    response.json(documents);
  } catch (error: any) {
    next(error);
  }
};

const getDocumentBreadcrumbsById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("Loading documents names...");
  try {
    const documentId = request.params.documentId;
    if (!documentId) {
      throw new CustomError("", 403);
    }
    let documentNameList: any[] = [];
    const getDoc = async (documentId: string) => {
      const documentName = await DocumentService.loadDocumentBreadcrumbsById(
        documentId
      );

      documentNameList.unshift(documentName?.title);

      if (documentName?.parentDocumentId) {
        await getDoc(documentName?.parentDocumentId);
      }
    };
    await getDoc(documentId);

    response.json(documentNameList);
  } catch (error: any) {
    next(error);
  }
};

export {
  createDocument,
  updateDocument,
  deleteDocument,
  loadWorldDocuments,
  getDocumentBreadcrumbsById,
};
