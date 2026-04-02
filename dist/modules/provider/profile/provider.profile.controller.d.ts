import { Request, Response } from "express";
interface AuthRequest extends Request {
    user?: any;
}
export declare const getProviderProfile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllProviders: (req: Request, res: Response) => Promise<void>;
export declare const getProvider: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProviderProfile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=provider.profile.controller.d.ts.map