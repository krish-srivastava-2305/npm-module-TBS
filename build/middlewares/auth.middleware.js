"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const authUser = (req, res, next) => {
    console.log(req.currentUser);
    if (!req.currentUser) {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    next();
};
exports.authUser = authUser;
