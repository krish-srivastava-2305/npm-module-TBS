import { CustomError } from "./custom-error";
export declare class DbConnectionError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
