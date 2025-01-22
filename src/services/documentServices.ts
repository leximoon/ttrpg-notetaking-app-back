import { create, update, del, findByWorldId } from "../db/documentRepository";

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

    static async updateDocument(
        documentId: string,
        field: keyof Document,
        content: any
    ) {
        const document = update(documentId, field, content);
        return document;
    }

    static async deleteDocument(documentId: string) {
        const document = del(documentId);
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
