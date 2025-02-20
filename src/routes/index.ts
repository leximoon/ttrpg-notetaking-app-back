import { Router } from "express";
import { userRouter } from "./userRoutes";
import { worldRouter } from "./worldRoutes";
import { documentRouter } from "./documentRoutes";

const router = Router();

router.use("/user", userRouter);
router.use("/world", worldRouter);
router.use("/documents", documentRouter);

export { router };
