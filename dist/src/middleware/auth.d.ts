import { NextFunction, Request, Response } from "express";
export declare enum UserRole {
    ADMIN = "ADMIN",
    PROVIDER = "PROVIDER",
    CUSTOMER = "CUSTOMER"
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: UserRole;
                emailVerified: boolean;
                status: "ACTIVE" | "SUSPENDED";
            };
        }
    }
}
declare const authorize: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default authorize;
//# sourceMappingURL=auth.d.ts.map