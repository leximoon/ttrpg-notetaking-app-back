import { findAll, create, findByUserId, findById } from "../db/worldRepository";

export class WorldService {
    static async getUserWorlds(userID: string) {
        const worlds = await findByUserId(userID);
        return worlds;
    }
    static async getWorldById(worldID: string) {
        const world = await findById(worldID);
        return world;
    }
    static async getWorlds(isPublic: boolean) {
        const worlds = await findAll(isPublic);
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
