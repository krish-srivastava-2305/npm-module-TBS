"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestErroor = void 0;
const custom_error_1 = require("./custom-error");
class BadRequestErroor extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestErroor.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.BadRequestErroor = BadRequestErroor;
