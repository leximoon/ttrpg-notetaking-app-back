import { Router } from "express";
import { deserializeUser } from "../middlewares/deserializeUser";
import {
  createDocument,
  loadUserDocuments,
} from "../controllers/documentController";

const documentRouter = Router();

//Protected routes
//documentRouter.use(deserializeUser);

documentRouter.post("/add", createDocument);
documentRouter.get("/load", loadUserDocuments);

export { documentRouter };
