import { Router } from "express";

import { deserializeUser } from "../middlewares/deserializeUser";
import {
    createWorld,
    currentUserWorlds,
    getAllWorlds,
} from "../controllers/worldController";

const worldRouter = Router();

worldRouter.get("/", getAllWorlds);

worldRouter.use(deserializeUser);

worldRouter.post("/", createWorld);
worldRouter.get("/me", currentUserWorlds);

export { worldRouter };
