import { z } from "zod";
export const updateProviderProfileSchema = z.object({
    shopName: z.string().min(2).optional(),
    address: z.string().min(5).optional(),
    phone: z.string().optional(),
    description: z.string().optional(),
    logo: z.string().optional(), // ❗ NO .url()
});
