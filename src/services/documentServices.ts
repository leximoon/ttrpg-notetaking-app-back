import { create, findByWorldId } from "../db/documentRepository";

// CREATE DOCUMENT
export class DocumentService {
    static async addDocument(title: string, userId: string, worldId: string) {
        const document = create(title, userId, worldId);

        return document;
    }

    static async loadWorldDocuments(worldId: string) {
        const documents = findByWorldId(worldId);

        return documents;
    }
}
