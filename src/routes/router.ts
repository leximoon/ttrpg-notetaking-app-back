import { Router } from "express";
import { userRouter, worldRouter, documentRouter } from "./index";

const router = Router();

router.use("/user", userRouter);
router.use("/world", worldRouter);
router.use("/documents", documentRouter);

export { router };
