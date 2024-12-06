import { User } from "@prisma/client";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { WorldService } from "../services/worldServices";

const getAllWorlds = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const worlds = await WorldService.getWorlds();
        res.json(worlds);
    } catch (error: any) {
        next(error);
    }
};

const currentUserWorlds = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
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

export { currentUserWorlds, getAllWorlds, createWorld };
