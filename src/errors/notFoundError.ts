import { CustomError } from "./customError";

export class NotFoundError extends CustomError {
    constructor(message: string = "Resource not found") {
        super(message, 404);
    }
}
