import { Router } from "express";

import {
    createDocument,
    loadWorldDocuments,
} from "../controllers/documentController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const documentRouter = Router();
//Protected routes
documentRouter.use(isAuthenticated);

documentRouter.post("/add", createDocument);
documentRouter.get("/:worldId", loadWorldDocuments);

export { documentRouter };
