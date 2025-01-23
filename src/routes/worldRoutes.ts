import { Router } from "express";

import { isAuthenticated } from "../middlewares/authHandler";
import {
    createWorld,
    getCurrentUserWorlds,
    getAllPublicWorlds,
    getWorld,
    deleteWorld,
} from "../controllers/worldController";

const worldRouter = Router();

worldRouter.use(isAuthenticated);

worldRouter.post("/", createWorld);
worldRouter.delete("/delete", deleteWorld);

//Get all public worlds
worldRouter.get("/public", getAllPublicWorlds);
worldRouter.get("/me", getCurrentUserWorlds);

//Get a specific world
worldRouter.get("/:worldId", getWorld);

export { worldRouter };
