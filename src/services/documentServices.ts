import { create, findByWorldId } from "../db/documentRepository";

// CREATE DOCUMENT
export class DocumentService {
    static async addDocument(
        title: string,
        userId: string,
        worldId: string,
        parentDocumentId?: string
    ) {
        const document = create(title, userId, worldId, parentDocumentId);

        return document;
    }

    static async loadWorldDocuments(
        worldId: string,
        parentDocumentId?: string
    ) {
        const documents = findByWorldId(worldId, parentDocumentId);

        return documents;
    }
}
