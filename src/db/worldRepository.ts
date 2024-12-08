import DbClient from "./db";

const db = DbClient.getInstance().prisma;

async function findAll(isPublic: boolean) {
    const world = await db.world.findMany({
        where: {
            isPublic: isPublic,
        },
    });

    return world;
}

async function findById(worldId: string) {
    const world = await db.world.findUnique({
        where: {
            id: worldId,
        },
    });

    return world;
}

async function findByUserId(userId: string) {
    const world = await db.world.findMany({
        where: {
            userID: userId,
        },
    });

    console.log();

    return world;
}

async function create(
    userId: string,
    name: string,
    description: string,
    isPublic: boolean
) {
    const world = await db.world.create({
        data: {
            id: crypto.randomUUID(),
            name: name,
            description: description,
            //TODO: add icon to the world
            icon: "🌍",
            userID: userId,
            isPublic: isPublic,
            members: [userId],
        },
    });

    return world;
}

export { findByUserId, findAll, findById, create };
