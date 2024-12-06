import DbClient from "./db";

const db = DbClient.getInstance().prisma;

// Create new document
async function create(title: string, userId: string) {
  // TODO: get db.document to work
  const document = await db.document.create({
    data: {
      id: crypto.randomUUID(),
      title: title,
      userId: userId,
      // TODO: get parentDocumentId if created in one
      isArchived: false,
      isPublic: false,
    },
  });

  return document;
}

// Find all documents with userId
async function findByUserId(userId: string) {
  const documents = await db.document.findMany({
    where: { userId: userId },
  });
  return documents;
}

export { create, findByUserId };
