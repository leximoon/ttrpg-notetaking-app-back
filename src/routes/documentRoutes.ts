import { Router } from "express";

import {
  createDocument,
  updateDocument,
  deleteDocument,
  loadWorldDocuments,
  getDocumentBreadcrumbsById,
} from "../controllers/documentController";
import { isAuthenticated } from "../middlewares/authHandler";

const documentRouter = Router();
//Protected routes
documentRouter.use(isAuthenticated);

documentRouter.post("/add", createDocument);
documentRouter.put("/update", updateDocument);
documentRouter.delete("/delete", deleteDocument);
documentRouter.get("/:worldId", loadWorldDocuments);
documentRouter.get("/breadcrumbs/:documentId", getDocumentBreadcrumbsById);

export { documentRouter };
