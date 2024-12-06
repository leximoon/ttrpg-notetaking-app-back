import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
    createWorld,
    currentUserWorlds,
    getAllWorlds,
} from "../controllers/worldController";

const worldRouter = Router();

//Get all public worlds
worldRouter.get("/", getAllWorlds);

worldRouter.use(isAuthenticated);

worldRouter.post("/", createWorld);
worldRouter.get("/me", currentUserWorlds);

export { worldRouter };
