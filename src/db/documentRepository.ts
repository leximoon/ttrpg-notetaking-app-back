import DbClient from "./db";

const db = DbClient.getInstance().prisma;

async function create(title: string, userId: string) {
  // TODO: get db.document to work
  const document = await db.document.create({
    data: {
      id: crypto.randomUUID(),
      title: title,
      // TODO: get userId from session
      // TODO: get parentDocumentId if created in one
      isArchived: false,
      isPublic: true,
    },
  });

  return document;
}

export { create };
