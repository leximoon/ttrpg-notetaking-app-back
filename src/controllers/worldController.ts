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
        const user = req.user as User;
        const worlds = await WorldService.getUserWorlds(user.id);
        res.json(worlds);
    } catch (error: any) {
        next(error);
    }
};
const createWorld = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as User;
        const { name, description, isPublic } = req.body;
        const world = await WorldService.addWorld(
            user.id,
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
