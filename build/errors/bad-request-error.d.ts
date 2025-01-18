import { CustomError } from "./custom-error";
export declare class BadRequestErroor extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
    }[];
}
