import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";


// user roles

export enum UserRole {
    ADMIN = "ADMIN",
    PROVIDER = "PROVIDER",
    CUSTOMER = "CUSTOMER",
}


//  Express Request

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


// Auth Middleware

const authorize = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // session from Better Auth
            const session = await auth.api.getSession({
                headers: req.headers as any,
            });

            //  Unauthenticated
            if (!session || !session.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // Email not verified
            if (!session.user.emailVerified) {
                return res.status(403).json({ message: "Email not verified" });
            }

            const user = session.user as any;

            // SUSPENDED 
            if (user.status === "SUSPENDED") {
                return res.status(403).json({ message: "User is SUSPENDED by admin" });
            }

            // Attach user to request
            req.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role as UserRole,
                emailVerified: user.emailVerified,
                status: user.status as "ACTIVE" | "SUSPENDED",
            };

            // Role-based  control
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                details: (error as Error).message,
            });
        }
    };
};

export default authorize;