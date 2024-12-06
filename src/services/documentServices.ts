import { create, findByUserId } from "../db/documentRepository";

// CREATE DOCUMENT
export class DocumentService {
  static async addDocument(title: string, userId: string) {
    const document = create(title, userId);

    return document;
  }

  static async loadUserDocuments(userId: string) {
    const documents = findByUserId(userId);

    return documents;
  }
}
