import { z } from "zod";
import { create } from "../db/documentRepository";
import { User } from "@prisma/client";

const addDocumentSchema = z.object({
  title: z.string(),
});

// CREATE DOCUMENT
export class DocumentService {
  static async addDocument(title: string, user: User) {
    addDocumentSchema.parse({ title });

    const document = create(title, user.id);

    return document;
  }
}
