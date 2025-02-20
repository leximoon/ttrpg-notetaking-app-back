import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CustomError } from "@errors/customError";

export function errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    //Get status code from error or set default status code
    const statusCode = error.statusCode || 500;

    const errorResponse: { status: number; message: string; details?: any } = {
        status: statusCode,
        message: error.message || "Internal server error.",
    };

    if (error instanceof ZodError) {
        res.status(400);

        const messages = error.errors.map((err) => err.message);
        errorResponse.message = "Validation error";
        errorResponse.details = messages;
    } else if (error instanceof CustomError) {
        errorResponse.message = error.message;
    } else {
        console.error("Unhandled error:", error);
        errorResponse.message = "Internal server error";

        if (process.env.NODE_ENV !== "production") {
            errorResponse.details = error.stack;
        }
    }

    res.status(statusCode).json(errorResponse);
}
