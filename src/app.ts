import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import configManager from "@config/index";

import { router } from "@routes";
import { errorHandler } from "@middlewares/errorHandler";
import { NotFoundError } from "@errors/notFoundError";

export function createApp(): Application {
    const app = express();

    //Basic middlewares
    app.use(express.json());
    app.use(cookieParser());

    //CORS config
    app.use(
        cors({
            credentials: true,
            origin: configManager.get("CORS_ORIGIN") as string,
        })
    );

    //Routes
    app.use(router);

    // Routes not found handler
    app.use((req, res, next) => {
        next(
            new NotFoundError(
                `The requested route '${req.originalUrl}' does not exist. Please check the URL or return to the homepage.`
            )
        );
    });
    app.use(errorHandler);

    return app;
}
