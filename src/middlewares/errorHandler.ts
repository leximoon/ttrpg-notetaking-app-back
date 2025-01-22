import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let errorMessage = "";
    // TODO: Refactor zod error handling
    if (error instanceof ZodError) {
        res.status(400);
        error.errors.map(({ message }) => {
            errorMessage += `${message}. `;
        });
    } else {
        res.status(error.statusCode || 500);
        errorMessage = error.message || "Internal server error.";
        console.log("An error has been occured: ", error.message);
        console.log("Status code: ", error.statusCode);
        console.error(error);
    }

    res.send({ status: res.statusCode, message: errorMessage });
}
