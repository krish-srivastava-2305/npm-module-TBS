import { CustomError } from "./custom-error";
export declare class NotAuthorizedError extends CustomError {
    statusCode: number;
    message: string;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
