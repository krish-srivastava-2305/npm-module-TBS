"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionError = void 0;
const custom_error_1 = require("./custom-error");
class DbConnectionError extends custom_error_1.CustomError {
    constructor() {
        super("Error connecting to database");
        this.statusCode = 500;
        Object.setPrototypeOf(this, DbConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: "Error connecting to database" }];
    }
}
exports.DbConnectionError = DbConnectionError;
