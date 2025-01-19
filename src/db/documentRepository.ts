import { title } from "process";
import DbClient from "./db";

const db = DbClient.getInstance().prisma;

// Create new document
async function create(
    title: string,
    userId: string,
    worldId: string,
    parentDocumentId?: string
) {
    const document = await db.document.create({
        data: {
            id: crypto.randomUUID(),
            title: title,
            userId: userId,
            worldId: worldId,
            parentDocumentId: parentDocumentId,
            isArchived: false,
            isPublic: false,
        },
    });

    return document;
}

// Find all documents with userId
async function findByWorldId(worldId: string, parentDocumentId?: string) {
    const documents = await db.document.findMany({
        where: {
            worldId: worldId,
            parentDocumentId: parentDocumentId,
            isArchived: false,
        },
        orderBy: {
            title: "asc",
        },
    });
    return documents;
}

export { create, findByWorldId };
