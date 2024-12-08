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
    const userId = request.userID;
    const { worldId } = request.body;

    console.log("Creating document...");
    try {
        const document = await DocumentService.addDocument(
            title,
            userId,
            worldId
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
    console.log("Loading documents...");
    try {
        const { worldId } = request.body;
        if (!worldId) {
            throw new CustomError("", 403);
        }
        const documents = await DocumentService.loadWorldDocuments(worldId);
        response.json(documents);
    } catch (error: any) {
        next(error);
    }
};

export { createDocument, loadWorldDocuments };
