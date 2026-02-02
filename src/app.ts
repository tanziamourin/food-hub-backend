import express, { Request, Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import authMiddleware from "./middleware/auth";
// import { prisma } from "./lib/prisma";
import { config } from "./config";
// import {categoryRouter} from "./modules/category/category.route";
// import { getMyProfile } from "./modules/customer/user.controller";
import { userRouter } from "./modules/customer/user.route";
import { mealsRouter } from "./modules/provider/meal/meal.routes";
import { providerOrderRouter } from "./modules/provider/order/provider.order.routes";
import { prisma } from "./lib/prisma";
import { orderRouter } from "./modules/customer/order/order.routes";
import { adminRouter } from "./modules/admin/admin.route";
import { getMyProfile } from "./modules/customer/user.controller";
import { categoryRouter } from "./modules/category/category.routes";
// import { adminRouter } from "./modules/admin/admin.routes";

const app = express();

const allowedOrigins = [
  config.app_url,
  "http://localhost:3000",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Auth routes
app.get("/api/auth/me", authMiddleware(), getMyProfile);
app.use("/api/auth", toNodeHandler(auth));

app.post("/api/auth/register", async (req: Request, res: Response) => { 
   console.log(">>> [REG_PROXY] START:", req.body?.email);
    res.setHeader('Content-Type', 'application/json');

    try {
        const result = await auth.api.signUpEmail({
            body: req.body,
        });

        const data = result as any;
        if (data?.error) {
            return res.status(200).json({ error: data.error });
        }

        if (data?.user) {
            console.log(">>> [REG_PROXY] User created. Verifying email...");

            // Auto-verify on registration
            await prisma.user.update({
                where: { email: data.user.email },
                data: { emailVerified: true }
            }).catch(e => console.error(">>> [REG_PROXY] Auto-verify failed:", e.message));

            return res.status(201).json({
                success: true,
                message: "Account created successfully",
                user: { ...data.user, emailVerified: true },
                session: data.session || null
            });
        }

        return res.status(200).json(result);

    } catch (err: any) {
        console.error(">>> [REG_PROXY] FATAL:", err);
        return res.status(500).json({
            error: { message: err.message || "Internal Server Error" }
        });
    }
 });
app.post("/api/auth/login", async (req: Request, res: Response) => { try {
        const result = await auth.api.signInEmail({ body: req.body });
        const data = result as any;

        if (data?.user?.email) {
            console.log(" User logged in. Ensuring emailVerified: true");

            // Auto-verify on login (in case they were created before this change)
            await prisma.user.update({
                where: { email: data.user.email },
                data: { emailVerified: true }
            }).catch(e => console.error(" Auto-verify failed:", e.message));
        }

        return res.json(result);
    } catch (err: any) {
        console.error( err);
        return res.status(500).json({
            error: { message: err.message || "Internal Server Error" }
        });
    }});


// User routes
app.use("/api/users", userRouter);
 
app.use("/api/orders", orderRouter);
// Public Meals
app.use("/api/meals", mealsRouter); 
app.use("/api/categories", categoryRouter);
 
// Provider Management

app.use("/api/provider/meals", mealsRouter);           
app.use("/api/provider/orders", providerOrderRouter);  

app.use("/api/admin", adminRouter);
// Root
app.get("/", (_req, res) => res.send("Food Hub Backend is running!"));

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
