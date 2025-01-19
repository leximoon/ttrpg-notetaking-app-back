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

export { createDocument, loadWorldDocuments };
