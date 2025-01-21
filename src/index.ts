import express, { Request, Response } from "express";
import { PORT } from "../config";
import { userRouter } from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";
import { worldRouter } from "./routes/worldRoutes";
import { documentRouter } from "./routes/documentRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();

//TODO: move app configurations

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"],
    })
);
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/world", worldRouter);
app.use("/documents", documentRouter);

app.get("/", (request, response) => {
    response.send("Hello nerds!");
});

// error handling
app.use(errorHandler);

// last
app.listen(PORT, () => {
    console.log(`All is aye ok! `, process.env.ACCESS_TOKEN_EXPIRE_TIME);
});
