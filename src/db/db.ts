import { Prisma, PrismaClient } from "@prisma/client";

// Prisma client singleton
class DbClient {
    private static instance: DbClient;

    private constructor() {}

    public static getInstance = () => {
        if (!DbClient.instance) {
            DbClient.instance = new PrismaClient();
        }
        return DbClient.instance;
    };
}

export default DbClient;
