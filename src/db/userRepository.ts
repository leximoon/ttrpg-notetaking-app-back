import DbClient from "./db";

const db = DbClient.getInstance().prisma;

async function create(email: string, password: string, name: string) {
    const user = await db.user.create({
        data: {
            id: crypto.randomUUID(),
            email: email,
            password: password,
            name: name,
        },
    });

    return user;
}

async function findByEmail(email: string) {
    const user = await db.user.findUnique({
        where: { email: email },
    });

    return user;
}

async function findById(id: string) {
    const user = await db.user.findUnique({
        where: { id: id },
    });
    return user;
}

async function updateUserInformation(id: string, name: string, email: string) {
    const user = await db.user.update({
        where: {
            id: id,
        },
        data: {
            name: name,
            email: email,
        },
    });
    return user;
}
export { create, findByEmail, findById, updateUserInformation };
