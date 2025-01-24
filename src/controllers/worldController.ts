import { User } from "@prisma/client";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { WorldService } from "../services/worldServices";

const getAllPublicWorlds = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const worlds = await WorldService.getWorlds(true);
        res.json(worlds);
    } catch (error: any) {
        next(error);
    }
};

const getCurrentUserWorlds = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(`retriving worlds for user ${req.userID}`);
        const userID = req.userID;
        const worlds = await WorldService.getUserWorlds(userID);
        res.json(worlds);
    } catch (error: any) {
        next(error);
    }
};
const createWorld = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = req.userID;
        const { name, description, isPublic } = req.body;
        const world = await WorldService.addWorld(
            userID,
            name,
            description,
            isPublic
        );
        res.json(world);
    } catch (error: any) {
        next(error);
    }
};
const deleteWorld = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { worldId } = req.body;
        console.log("Deleting world: ", worldId);
        const world = await WorldService.deleteWorld(worldId);
        res.json(world);
    } catch (error: any) {
        next(error);
    }
};

const getWorld = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const worldId = req.params.worldId;
        console.log("Loading world: ", worldId);
        const world = await WorldService.getWorldById(worldId);
        res.json(world);
    } catch (error: any) {
        next(error);
    }
};

export {
    getAllPublicWorlds,
    getCurrentUserWorlds,
    createWorld,
    deleteWorld,
    getWorld,
};
