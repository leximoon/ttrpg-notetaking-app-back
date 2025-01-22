import { Router } from "express";

import {
    createDocument,
    updateDocument,
    deleteDocument,
    loadWorldDocuments,
} from "../controllers/documentController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const documentRouter = Router();
//Protected routes
documentRouter.use(isAuthenticated);

documentRouter.post("/add", createDocument);
documentRouter.put("/update", updateDocument);
documentRouter.delete("/delete", deleteDocument);
documentRouter.get("/:worldId", loadWorldDocuments);

export { documentRouter };
