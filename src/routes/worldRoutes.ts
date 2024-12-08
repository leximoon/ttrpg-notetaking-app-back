import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
    createWorld,
    getCurrentUserWorlds,
    getAllPublicWorlds,
    getWorld,
} from "../controllers/worldController";

const worldRouter = Router();

//Get all public worlds
worldRouter.get("/public", getAllPublicWorlds);

worldRouter.use(isAuthenticated);

worldRouter.post("/", createWorld);

worldRouter.get("/me", getCurrentUserWorlds);

worldRouter.get("/:worldId", getWorld);

export { worldRouter };
