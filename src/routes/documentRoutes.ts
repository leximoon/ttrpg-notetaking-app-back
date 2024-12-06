import { Router } from "express";

import {
    createDocument,
    loadUserDocuments,
} from "../controllers/documentController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const documentRouter = Router();

//Protected routes
documentRouter.use(isAuthenticated);

documentRouter.post("/add", createDocument);
documentRouter.get("/load", loadUserDocuments);

export { documentRouter };
