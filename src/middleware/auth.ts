import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export enum UserRole {
  ADMIN = "ADMIN",
  PROVIDER = "PROVIDER",
  CUSTOMER = "CUSTOMER",
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

const authorize = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ✅ FIX: correct headers format
   const session = await auth.api.getSession({
  headers: Object.fromEntries(
    Object.entries(req.headers).map(([k, v]) => [k, v as string])
  ) as any,
});

      if (!session || !session.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = session.user as any;

      if (user.status === "SUSPENDED") {
        return res.status(403).json({ message: "User is SUSPENDED" });
      }

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as UserRole,
        emailVerified: user.emailVerified,
        status: user.status,
      };

      // Role check
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      console.error("AUTH ERROR:", error); // ✅ important for debugging

      return res.status(500).json({
        message: "Auth failed",
        details: (error as Error).message,
      });
    }
  };
};

export default authorize;