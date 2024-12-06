import { getAll, create } from "../db/worldRepository";

export class WorldService {
    static async getUserWorlds(userID: string) {}

    static async getWorlds() {
        const worlds = await getAll();

        return worlds;
    }
    static async addWorld(
        userID: string,
        name: string,
        description: string,
        isPublic: boolean
    ) {
        const world = await create(userID, name, description, isPublic);

        return world;
    }
}
