import { Request, Response } from "express";
interface AuthRequest extends Request {
    user?: {
        id: string;
        name: string;
        email: string;
        role: any;
        emailVerified: boolean;
        status: "ACTIVE" | "SUSPENDED";
    };
}
export declare const getMeals: (req: Request, res: Response) => Promise<void>;
export declare const getMeal: (req: Request, res: Response) => Promise<void>;
export declare const createMeal: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateMeal: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteMeal: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=meal.controller.d.ts.map