import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
    createWorld,
    getCurrentUserWorlds,
    getAllPublicWorlds,
    getWorld,
} from "../controllers/worldController";

const worldRouter = Router();

worldRouter.use(isAuthenticated);

worldRouter.post("/", createWorld);

//Get all public worlds
worldRouter.get("/public", getAllPublicWorlds);
worldRouter.get("/me", getCurrentUserWorlds);

//Get a specific world
worldRouter.get("/:worldId", getWorld);

export { worldRouter };
