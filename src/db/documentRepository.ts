import DbClient from "./db";
import { Prisma } from "@prisma/client";

const db = DbClient.getInstance().prisma;

// Create new document
async function create(
    title: string,
    userId: string,
    worldId: string,
    parentDocumentId?: string
) {
    let parentDocumentIdSave = null;
    if (parentDocumentId) {
        parentDocumentIdSave = parentDocumentId;
    }
    const document = await db.document.create({
        data: {
            id: crypto.randomUUID(),
            title: title,
            userId: userId,
            worldId: worldId,
            parentDocumentId: parentDocumentIdSave,
            isArchived: false,
            isPublic: false,
        },
    });

    return document;
}

async function update(documentId: string, field: keyof Document, content: any) {
    const document = await db.document.update({
        where: {
            id: documentId,
        },
        data: {
            [field]: content,
        },
    });
    return document;
}

async function del(documentId: string) {
    const document = await db.document.delete({
        where: {
            id: documentId,
        },
    });
    return document;
}
//Delete documents using worldID
async function delByWorldId(worldId: string) {
    const document = await db.document.deleteMany({
        where: {
            worldId: worldId,
        },
    });
    return document;
}

// Find all documents with userId
async function findByWorldId(worldId: string, parentDocumentId?: string) {
    if (parentDocumentId) {
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
    } else {
        const documents = await db.document.findMany({
            where: {
                worldId: worldId,
                parentDocumentId: null,
                isArchived: false,
            },
            orderBy: {
                title: "asc",
            },
        });
        return documents;
    }
}

export { create, update, del, delByWorldId, findByWorldId };
