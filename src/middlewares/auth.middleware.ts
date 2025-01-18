import { NotAuthorizedError } from "../errors/not-authorized-error";
import { Request, Response, NextFunction } from "express";

export const authUser = (req:Request, res: Response, next:NextFunction) => {
    console.log(req.currentUser);
    if(!req.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
}