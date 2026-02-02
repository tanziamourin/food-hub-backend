import { UserRole } from "../middleware/auth";

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

export {};
