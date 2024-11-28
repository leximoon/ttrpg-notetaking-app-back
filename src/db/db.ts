import { PrismaClient } from "@prisma/client";

// Prisma client singleton
class DbClient {
  public prisma: PrismaClient;
  private static instance: DbClient;
  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance = () => {
    if (!DbClient.instance) {
      DbClient.instance = new DbClient();
    }
    return DbClient.instance;
  };
}

export default DbClient;
