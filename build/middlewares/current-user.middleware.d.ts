import { Request, Response, NextFunction } from "express";
interface currentUser {
    email: string;
    id: string;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: currentUser;
        }
    }
}
export declare function currentUserMiddleware(req: Request, res: Response, next: NextFunction): Promise<void>;
export {};
